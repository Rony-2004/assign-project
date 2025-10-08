import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';

import { config } from './config';
import { testConnection, closeConnection } from './db';
import ideaRoutes from './routes/ideas';
import healthRoutes from './routes/health';
import { logWithTimestamp, createErrorResponse } from './utils/helpers';

// Create Fastify instance
const fastify = Fastify({
  logger:
    process.env['NODE_ENV'] === 'production'
      ? { level: config.logging.level }
      : {
          level: config.logging.level,
          transport: {
            target: 'pino-pretty',
            options: {
              colorize: true,
            },
          },
        },
});

// Global error handler
fastify.setErrorHandler(async (error, request, reply) => {
  const statusCode = error.statusCode || 500;
  const errorMessage = error.message || 'Internal Server Error';
  
  logWithTimestamp('error', `Error ${statusCode}: ${errorMessage}`, {
    url: request.url,
    method: request.method,
    error: error.stack,
  });

  return reply.status(statusCode).send(
    createErrorResponse(
      error.code || 'INTERNAL_ERROR',
      errorMessage
    )
  );
});

// Not found handler
fastify.setNotFoundHandler(async (request, reply) => {
  return reply.status(404).send(
    createErrorResponse('NOT_FOUND', `Route ${request.method} ${request.url} not found`)
  );
});

async function buildApp() {
  try {
    // Register plugins
    await fastify.register(helmet, {
      contentSecurityPolicy: false, // Disable CSP for API
    });

    await fastify.register(cors, {
      origin: (origin, callback) => {
        const allowedOrigins = config.cors.origin.split(',').map(o => o.trim());
        
        // Allow requests with no origin (mobile apps, Postman, etc.)
        if (!origin) {
          callback(null, true);
          return;
        }
        
        // Check if origin matches any allowed pattern
        const isAllowed = allowedOrigins.some(allowedOrigin => {
          // Exact match
          if (origin === allowedOrigin) return true;
          
          // Pattern match for Vercel preview deployments
          if (allowedOrigin.includes('*.vercel.app') && origin.endsWith('.vercel.app')) {
            return true;
          }
          
          return false;
        });
        
        callback(null, isAllowed);
      },
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    });

    await fastify.register(rateLimit, {
      max: config.rateLimit.max,
      timeWindow: config.rateLimit.window,
      errorResponseBuilder: () => {
        return createErrorResponse('RATE_LIMIT_EXCEEDED', 'Too many requests');
      },
    });

    // Register routes
    await fastify.register(healthRoutes, { prefix: '/api' });
    await fastify.register(ideaRoutes, { prefix: '/api' });

    // Root endpoint
    fastify.get('/', async () => {
      return {
        name: 'Idea Board API',
        version: '1.0.0',
        description: 'Backend API for the Idea Board application',
        endpoints: {
          health: '/api/health',
          ideas: '/api/ideas',
        },
        timestamp: new Date().toISOString(),
      };
    });

    return fastify;
  } catch (error) {
    logWithTimestamp('error', 'Failed to build app:', error);
    throw error;
  }
}

async function start() {
  try {
    logWithTimestamp('info', 'Starting Idea Board API server...');

    // Test database connection
    const dbConnected = await testConnection();
    if (!dbConnected) {
      logWithTimestamp('warn', 'Database connection failed, but server will continue...');
    } else {
      // Run migrations and seeding on startup in production
      if (process.env['NODE_ENV'] === 'production') {
        try {
          const { migrate } = await import('./db/migrate');
          const { seed } = await import('./db/seed');
          
          logWithTimestamp('info', 'Running database migrations...');
          await migrate();
          
          logWithTimestamp('info', 'Seeding database...');
          await seed();
        } catch (error) {
          logWithTimestamp('warn', 'Migration/seed error (this might be normal if already done):', error);
        }
      }
    }

    // Build the app
    const app = await buildApp();

    // Start the server
    await app.listen({
      host: config.server.host,
      port: config.server.port,
    });

    logWithTimestamp('info', `🚀 Server running at http://${config.server.host}:${config.server.port}`);
    logWithTimestamp('info', `📚 API documentation available at http://${config.server.host}:${config.server.port}/api`);
    
  } catch (error) {
    logWithTimestamp('error', 'Failed to start server:', error);
    process.exit(1);
  }
}

// Graceful shutdown
const gracefulShutdown = async (signal: string) => {
  logWithTimestamp('info', `Received ${signal}, shutting down gracefully...`);
  
  try {
    await fastify.close();
    await closeConnection();
    logWithTimestamp('info', '✨ Server shut down complete');
    process.exit(0);
  } catch (error) {
    logWithTimestamp('error', 'Error during shutdown:', error);
    process.exit(1);
  }
};

// Handle shutdown signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logWithTimestamp('error', 'Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logWithTimestamp('error', 'Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

if (require.main === module) {
  start();
}

export default buildApp;
export { fastify };