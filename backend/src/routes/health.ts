import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { createSuccessResponse } from '../utils/helpers';

export default async function healthRoutes(fastify: FastifyInstance) {
  // Health check endpoint
  fastify.get('/health', async (_request: FastifyRequest, reply: FastifyReply) => {
    const healthInfo = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env['NODE_ENV'] || 'development',
      version: process.env['npm_package_version'] || '1.0.0',
    };

    return reply.send(createSuccessResponse(healthInfo, 'Service is healthy'));
  });

  // Database health check
  fastify.get('/health/db', async (_request: FastifyRequest, reply: FastifyReply) => {
    try {
      // Import database here to avoid circular dependency issues
      const { db } = await import('../db');
      const { sql } = await import('drizzle-orm');
      
      // Simple database query to check connection
      await db.execute(sql`SELECT 1`);
      
      const dbHealth = {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        connection: 'active',
      };

      return reply.send(createSuccessResponse(dbHealth, 'Database connection is healthy'));
    } catch (error) {
      const dbHealth = {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        connection: 'failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      };

      return reply.status(503).send({
        success: false,
        data: dbHealth,
        error: 'DATABASE_UNHEALTHY',
        message: 'Database connection failed',
        timestamp: new Date().toISOString(),
      });
    }
  });
}