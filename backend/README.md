# Idea Board Backend - Development Guide

## 📋 Prerequisites
- Node.js 18+ 
- npm or yarn
- Neon PostgreSQL database URL

## 🚀 Quick Start

### 1. Environment Setup
Create a `.env` file in the backend directory:

```env
DATABASE_URL=your-neon-database-url-here
PORT=3001
CORS_ORIGIN=http://localhost:3000
JWT_SECRET=your-jwt-secret-key
```

### 2. Run Setup Script

**Windows:**
```bash
setup.bat
```

**macOS/Linux:**
```bash
chmod +x setup.sh
./setup.sh
```

**Manual Setup:**
```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# Seed database
npx prisma db seed

# Start development server
npm run dev
```

## 🛠️ Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run prisma:studio # Open Prisma Studio
npm run db:migrate   # Run database migrations  
npm run db:seed      # Seed database with test data
```

## 📡 API Endpoints

### Health Check
- `GET /health` - Health check endpoint

### Ideas
- `GET /api/ideas` - Get all ideas
- `POST /api/ideas` - Create new idea
- `PUT /api/ideas/:id/upvote` - Upvote an idea
- `POST /api/ideas` - Create a new idea
- `POST /api/ideas/:id/upvote` - Upvote an idea
- `DELETE /api/ideas/:id` - Delete an idea (admin)

### Health & Monitoring
- `GET /api/health` - API health check
- `GET /api/health/db` - Database health check

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 13+
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the backend directory:
   ```bash
   cd backend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   
   Then edit `.env` with your configuration:
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/ideaboard
   PORT=3001
   CORS_ORIGIN=http://localhost:3000
   ```

5. Set up the database:
   ```bash
   # Generate migrations
   npm run migration:generate
   
   # Push migrations to database
   npm run migration:push
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:3001`

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
# Server Configuration
PORT=3001
HOST=0.0.0.0
NODE_ENV=development

# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/ideaboard
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ideaboard
DB_USER=username
DB_PASSWORD=password

# Security
JWT_SECRET=your-super-secure-jwt-secret-key-here
API_KEY=your-api-key-here

# Rate Limiting
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW=60000

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# Logging
LOG_LEVEL=info
```

## Database Schema

### Ideas Table
```sql
CREATE TABLE ideas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  text TEXT NOT NULL,
  upvotes INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);
```

## Project Structure

```
backend/
├── src/
│   ├── config/           # Configuration management
│   │   └── index.ts      # Environment config with validation
│   ├── db/               # Database layer
│   │   ├── index.ts      # Database connection
│   │   └── schema.ts     # Drizzle schema definitions
│   ├── routes/           # API route handlers
│   │   ├── ideas.ts      # Ideas CRUD operations
│   │   └── health.ts     # Health check endpoints
│   ├── types/            # TypeScript type definitions
│   │   └── api.ts        # API request/response types
│   ├── utils/            # Utility functions
│   │   └── helpers.ts    # Common helper functions
│   └── server.ts         # Main server setup
├── drizzle/              # Database migrations
├── package.json
├── tsconfig.json
├── Dockerfile
└── README.md
```

## API Request/Response Examples

### Get Ideas
```bash
GET /api/ideas?limit=10&offset=0&sortBy=upvotes&order=desc
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "text": "A great idea for the community",
      "upvotes": 15,
      "createdAt": "2024-01-01T12:00:00Z",
      "updatedAt": "2024-01-01T12:00:00Z"
    }
  ],
  "message": "Ideas fetched successfully",
  "timestamp": "2024-01-01T12:00:00Z"
}
```

### Create Idea
```bash
POST /api/ideas
Content-Type: application/json

{
  "text": "My brilliant new idea"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174001",
    "text": "My brilliant new idea",
    "upvotes": 0,
    "createdAt": "2024-01-01T12:00:00Z",
    "updatedAt": "2024-01-01T12:00:00Z"
  },
  "message": "Idea created successfully",
  "timestamp": "2024-01-01T12:00:00Z"
}
```

### Upvote Idea
```bash
POST /api/ideas/123e4567-e89b-12d3-a456-426614174001/upvote
```

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run test suite
- `npm run migration:generate` - Generate database migrations
- `npm run migration:push` - Apply migrations to database
- `npm run db:studio` - Open Drizzle Studio

## Docker

### Build and run with Docker:

```bash
# Build the image
docker build -t idea-board-backend .

# Run the container
docker run -p 3001:3001 --env-file .env idea-board-backend
```

### With Docker Compose:

```bash
docker-compose up --build
```

## Security Features

- **Rate Limiting**: Prevents abuse with configurable limits
- **CORS**: Configurable cross-origin resource sharing
- **Helmet**: Security headers and protection
- **Input Validation**: Zod schemas validate all inputs
- **Error Handling**: Structured error responses
- **Health Checks**: Monitor application and database health

## Performance

- **Fastify**: One of the fastest Node.js frameworks
- **Connection Pooling**: Efficient database connections
- **Structured Logging**: Performance monitoring ready
- **Graceful Shutdown**: Proper cleanup on termination

## Monitoring

The API includes comprehensive health checks:

- `GET /api/health` - Basic application health
- `GET /api/health/db` - Database connectivity check

## Development

### Code Quality

- ESLint configuration for consistent code style
- TypeScript for type safety
- Structured error handling
- Comprehensive input validation

### Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

## Deployment

The application is production-ready with:

- Docker containerization
- Health checks for orchestration
- Graceful shutdown handling
- Environment-based configuration
- Security best practices

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request