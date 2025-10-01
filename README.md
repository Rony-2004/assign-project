# 🚀 Idea Board - Full Stack Application

A modern, production-ready idea sharing platform where users can anonymously post ideas, upvote submissions, and engage with creative content. Built with Next.js 15, Fastify 4, Drizzle ORM, and PostgreSQL (Neon).

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15.5-black.svg)](https://nextjs.org/)
[![Fastify](https://img.shields.io/badge/Fastify-4.24-green.svg)](https://www.fastify.io/)
[![Docker](https://img.shields.io/badge/Docker-Compose-blue.svg)](https://www.docker.com/)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-Ready-326CE5.svg)](https://kubernetes.io/)

## 📋 Table of Contents

- [Features](#-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Getting Started](#-getting-started)
- [Docker Deployment](#-docker-deployment)
- [Kubernetes Deployment](#-kubernetes-deployment)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Development](#-development)
- [Environment Variables](#-environment-variables)
- [Design Decisions](#-design-decisions)
- [Trade-offs](#-trade-offs)
- [Future Enhancements](#-future-enhancements)

## 🌟 Features

### User Experience
- **🎨 Stunning UI**: Premium gradient design with smooth animations
- **📱 Fully Responsive**: Optimized for mobile, tablet, and desktop
- **⚡ Real-time Updates**: Automatic polling for new ideas and votes
- **📝 Anonymous Posting**: No registration or login required
- **👍 One-Click Upvoting**: Instant feedback with animated interactions
- **🌈 Rich Visual Effects**: Gradient backgrounds, 3D effects, and decorative elements
- **♿ Accessible**: ARIA labels and keyboard navigation support

### Application Features
- **Landing Page**: Professional marketing page with hero section, features, and CTAs
- **Idea Board**: Full-featured CRUD application for managing ideas
- **Character Limits**: 100 characters for titles, 500 for descriptions
- **Upvote System**: Community-driven content ranking
- **Empty States**: Helpful UI when no content exists
- **Error Handling**: Graceful error states and user feedback
- **Loading States**: Skeleton screens and spinners

### Technical Features
- **🚀 High Performance**: Fastify backend with optimized queries
- **🔒 Security**: Rate limiting, CORS, Helmet, input validation with Zod
- **🗄️ Database**: PostgreSQL (Neon) with SSL, Drizzle ORM
- **📊 Health Checks**: Comprehensive monitoring endpoints
- **🐳 Containerized**: Multi-stage Docker builds for production
- **☸️ Kubernetes Ready**: Complete K8s manifests with HPA
- **🔄 Auto-scaling**: Horizontal Pod Autoscaler configuration
- **📝 Type Safety**: End-to-end TypeScript coverage

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Client Browser                            │
│                    http://localhost:3000                         │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           │ HTTP/REST
                           │
┌──────────────────────────▼──────────────────────────────────────┐
│                     Frontend Service                             │
│                      (Next.js 15)                                │
│  - Server-side rendering                                         │
│  - React 19 components                                           │
│  - Tailwind CSS styling                                          │
│  - API client with fetch                                         │
│                    Port: 3000                                    │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           │ REST API
                           │ http://localhost:3001/api
                           │
┌──────────────────────────▼──────────────────────────────────────┐
│                     Backend Service                              │
│                      (Fastify 4)                                 │
│  - RESTful API endpoints                                         │
│  - Request validation (Zod)                                      │
│  - Rate limiting & CORS                                          │
│  - Drizzle ORM queries                                           │
│                    Port: 3001                                    │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           │ PostgreSQL Protocol
                           │ SSL Connection
                           │
┌──────────────────────────▼──────────────────────────────────────┐
│                  PostgreSQL Database                             │
│                      (Neon Cloud)                                │
│  - Managed PostgreSQL                                            │
│  - Automatic backups                                             │
│  - SSL encryption                                                │
│  - Connection pooling                                            │
└──────────────────────────────────────────────────────────────────┘
```

### Data Flow

1. **User Action** → Frontend captures user input
2. **API Request** → Frontend sends HTTP request to backend
3. **Validation** → Backend validates with Zod schemas
4. **Database Query** → Drizzle ORM executes SQL via postgres-js
5. **Response** → Backend returns JSON response
6. **UI Update** → Frontend updates React state and re-renders

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 15.5.4 | React framework with SSR |
| **React** | 19.0.0 | UI library |
| **TypeScript** | 5.x | Type safety |
| **Tailwind CSS** | 3.4.1 | Utility-first CSS |
| **SWR/Polling** | Custom | Data fetching |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Fastify** | 4.24.3 | High-performance web framework |
| **TypeScript** | 5.x | Type safety |
| **Drizzle ORM** | 0.29.0 | Type-safe SQL ORM |
| **postgres-js** | 3.4.3 | PostgreSQL client |
| **Zod** | 3.22.4 | Runtime validation |
| **@fastify/cors** | 9.0.1 | CORS middleware |
| **@fastify/helmet** | 11.1.1 | Security headers |
| **@fastify/rate-limit** | 9.1.0 | Rate limiting |

### Database
| Technology | Purpose |
|------------|---------|
| **PostgreSQL** | Relational database |
| **Neon** | Serverless Postgres hosting |
| **Drizzle Kit** | Schema migrations |

### DevOps
| Technology | Purpose |
|------------|---------|
| **Docker** | Containerization |
| **Docker Compose** | Multi-container orchestration |
| **Kubernetes** | Container orchestration |
| **NGINX** | Ingress controller (optional) |

## 📦 Prerequisites

- **Node.js**: 18.x or higher
- **npm**: 9.x or higher
- **Docker**: 20.x or higher (for containerization)
- **Docker Compose**: 2.x or higher
- **Kubernetes**: 1.24+ (optional, for K8s deployment)
- **kubectl**: Latest (optional, for K8s deployment)
- **PostgreSQL Database**: Neon account or local PostgreSQL

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd assignment
```

### 2. Set Up Database

1. Create a free account at [Neon](https://neon.tech)
2. Create a new project
3. Copy the connection string (it should look like):
   ```
   postgresql://user:password@host/database?sslmode=require
   ```

### 3. Configure Environment Variables

#### Backend Configuration

Create or update `backend/.env`:

```env
# Server Configuration
PORT=3001
HOST=0.0.0.0
NODE_ENV=development

# Database Configuration (Neon)
DATABASE_URL=postgresql://user:password@host/database?sslmode=require&channel_binding=require

# Rate Limiting
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW=60000

# CORS
CORS_ORIGIN=http://localhost:3000

# Logging
LOG_LEVEL=info
```

#### Frontend Configuration (Optional)

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 4. Install Dependencies

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd frontend
npm install
```

### 5. Initialize Database

```bash
cd backend

# Generate migration files
npm run db:generate

# Run migrations
npm run db:migrate

# Seed initial data (optional)
npm run db:seed
```

### 6. Run Development Servers

#### Option A: Run Both Services Separately

Terminal 1 (Backend):
```bash
cd backend
npm run dev
```

Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```

#### Option B: Use Docker Compose (Recommended)

```bash
# From project root
docker-compose up --build
```

### 7. Access the Application

- **Landing Page**: http://localhost:3000
- **Idea Board**: http://localhost:3000/app
- **Backend API**: http://localhost:3001/api/health
- **API Docs**: See [API Documentation](#-api-documentation) below

## 🐳 Docker Deployment

### Build and Run with Docker Compose

```bash
# Build and start all services
docker-compose up --build

# Run in detached mode
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

### Docker Compose Services

The `docker-compose.yml` defines:

- **Backend**: Fastify API server on port 3001
- **Frontend**: Next.js web server on port 3000
- **Network**: Custom bridge network `ideaboard_network`
- **Health Checks**: Automated health monitoring
- **Dependencies**: Frontend waits for backend to be healthy

### Individual Docker Builds

```bash
# Build backend image
docker build -t ideaboard-backend:latest ./backend

# Build frontend image
docker build -t ideaboard-frontend:latest ./frontend

# Run backend
docker run -p 3001:3001 --env-file backend/.env ideaboard-backend:latest

# Run frontend
docker run -p 3000:3000 -e NEXT_PUBLIC_API_URL=http://localhost:3001 ideaboard-frontend:latest
```

## ☸️ Kubernetes Deployment

Complete Kubernetes manifests are provided in the `k8s/` directory.

### Quick Deploy

```bash
# Apply all manifests
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/secret.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/backend-service.yaml
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/frontend-service.yaml
kubectl apply -f k8s/hpa-backend.yaml
kubectl apply -f k8s/hpa-frontend.yaml

# Verify deployment
kubectl get all -n ideaboard

# Access application
kubectl port-forward -n ideaboard svc/frontend 3000:80
```

### Features

- **Namespace Isolation**: All resources in `ideaboard` namespace
- **High Availability**: 2 replicas minimum per service
- **Auto-scaling**: HPA scales 2-10 pods based on CPU/Memory
- **Health Checks**: Liveness and readiness probes
- **Resource Limits**: Defined CPU and memory constraints
- **Secrets Management**: Secure database credentials
- **Load Balancing**: Service-based traffic distribution
- **Ingress Support**: NGINX ingress for external access

See `k8s/README.md` for detailed deployment instructions.

## 📚 API Documentation

### Base URL
```
http://localhost:3001/api
```

### Endpoints

#### Health Check
```http
GET /api/health
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-10-01T12:00:00.000Z",
  "uptime": 123.45,
  "database": "connected"
}
```

#### Get All Ideas
```http
GET /api/ideas?limit=50&offset=0&sortBy=upvotes&order=desc
```

**Query Parameters:**
- `limit` (optional): Number of results (default: 50)
- `offset` (optional): Pagination offset (default: 0)
- `sortBy` (optional): Sort field - `createdAt` or `upvotes` (default: `createdAt`)
- `order` (optional): Sort order - `asc` or `desc` (default: `desc`)

**Response:**
```json
{
  "ideas": [
    {
      "id": "abc123",
      "title": "Build a time machine",
      "description": "Using quantum entanglement and a DeLorean",
      "upvotes": 42,
      "createdAt": "2025-10-01T12:00:00.000Z",
      "updatedAt": "2025-10-01T12:30:00.000Z"
    }
  ],
  "total": 1,
  "limit": 50,
  "offset": 0
}
```

#### Get Single Idea
```http
GET /api/ideas/:id
```

**Response:**
```json
{
  "id": "abc123",
  "title": "Build a time machine",
  "description": "Using quantum entanglement and a DeLorean",
  "upvotes": 42,
  "createdAt": "2025-10-01T12:00:00.000Z",
  "updatedAt": "2025-10-01T12:30:00.000Z"
}
```

#### Create Idea
```http
POST /api/ideas
Content-Type: application/json

{
  "title": "Build a time machine",
  "description": "Using quantum entanglement and a DeLorean"
}
```

**Validation:**
- `title`: Required, string, 1-100 characters
- `description`: Required, string, 1-500 characters

**Response:**
```json
{
  "id": "abc123",
  "title": "Build a time machine",
  "description": "Using quantum entanglement and a DeLorean",
  "upvotes": 0,
  "createdAt": "2025-10-01T12:00:00.000Z",
  "updatedAt": "2025-10-01T12:00:00.000Z"
}
```

#### Upvote Idea
```http
PATCH /api/ideas/:id/upvote
```

**Response:**
```json
{
  "id": "abc123",
  "title": "Build a time machine",
  "description": "Using quantum entanglement and a DeLorean",
  "upvotes": 43,
  "createdAt": "2025-10-01T12:00:00.000Z",
  "updatedAt": "2025-10-01T12:30:00.000Z"
}
```

#### Delete Idea
```http
DELETE /api/ideas/:id
```

**Response:**
```json
{
  "message": "Idea deleted successfully"
}
```

### Error Responses

All endpoints return consistent error responses:

```json
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "Validation error: Title must be between 1 and 100 characters"
}
```

**Common Status Codes:**
- `200 OK`: Success
- `201 Created`: Resource created
- `400 Bad Request`: Invalid input
- `404 Not Found`: Resource not found
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: Server error

## 📁 Project Structure

```
assignment/
├── backend/                    # Backend API service
│   ├── src/
│   │   ├── config/            # Configuration management
│   │   │   └── index.ts       # Environment config
│   │   ├── db/                # Database layer
│   │   │   ├── index.ts       # DB connection
│   │   │   ├── migrate.ts     # Migration runner
│   │   │   ├── schema.ts      # Drizzle schema
│   │   │   └── seed.ts        # Seed data
│   │   ├── routes/            # API routes
│   │   │   ├── health.ts      # Health check endpoint
│   │   │   └── ideas.ts       # Ideas CRUD endpoints
│   │   ├── types/             # TypeScript types
│   │   │   └── api.ts         # API types
│   │   ├── utils/             # Utility functions
│   │   │   └── helpers.ts     # Helper functions
│   │   └── server.ts          # Main server file
│   ├── .dockerignore          # Docker ignore rules
│   ├── .env                   # Environment variables
│   ├── Dockerfile             # Multi-stage Docker build
│   ├── drizzle.config.ts      # Drizzle ORM config
│   ├── package.json           # Dependencies
│   └── tsconfig.json          # TypeScript config
├── frontend/                   # Frontend web application
│   ├── app/                   # Next.js app directory
│   │   ├── app/               # Idea Board application
│   │   │   ├── components/    # App-specific components
│   │   │   │   ├── IdeaCard.tsx      # Idea display card
│   │   │   │   └── IdeaForm.tsx      # Idea submission form
│   │   │   └── page.tsx       # Idea Board main page
│   │   ├── components/        # Shared components
│   │   │   ├── EmptyState.tsx        # Empty state UI
│   │   │   ├── ErrorBoundary.tsx     # Error handling
│   │   │   ├── Header.tsx            # Header component
│   │   │   └── LoadingSpinner.tsx    # Loading states
│   │   ├── config/            # Frontend config
│   │   │   └── index.ts       # API URL config
│   │   ├── hooks/             # React hooks
│   │   │   └── useIdeas.ts    # Ideas data hook
│   │   ├── lib/               # Libraries
│   │   │   └── api.ts         # API client
│   │   ├── types/             # TypeScript types
│   │   │   └── api.ts         # API types
│   │   ├── utils/             # Utility functions
│   │   │   └── helpers.ts     # Helper functions
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Landing page
│   ├── public/                # Static assets
│   ├── .dockerignore          # Docker ignore rules
│   ├── .env.local.example     # Example env file
│   ├── .gitignore             # Git ignore rules
│   ├── Dockerfile             # Multi-stage Docker build
│   ├── next.config.ts         # Next.js config
│   ├── package.json           # Dependencies
│   ├── postcss.config.mjs     # PostCSS config
│   └── tsconfig.json          # TypeScript config
├── k8s/                       # Kubernetes manifests
│   ├── namespace.yaml         # Namespace definition
│   ├── configmap.yaml         # Configuration
│   ├── secret.yaml            # Secrets
│   ├── backend-deployment.yaml  # Backend deployment
│   ├── backend-service.yaml     # Backend service
│   ├── frontend-deployment.yaml # Frontend deployment
│   ├── frontend-service.yaml    # Frontend service
│   ├── hpa-backend.yaml       # Backend autoscaler
│   ├── hpa-frontend.yaml      # Frontend autoscaler
│   ├── ingress.yaml           # Ingress rules
│   └── README.md              # K8s documentation
├── docker-compose.yml         # Docker Compose config
└── README.md                  # This file
```

## 💻 Development

### Available Scripts

#### Backend
```bash
npm run dev          # Start development server with hot reload
npm run build        # Compile TypeScript to JavaScript
npm start            # Run compiled code
npm run db:generate  # Generate migration files
npm run db:migrate   # Run database migrations
npm run db:seed      # Seed database with sample data
npm run db:studio    # Open Drizzle Studio (GUI)
```

#### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
```

### Code Style

- **TypeScript**: Strict mode enabled
- **ESLint**: Configured for Next.js and React
- **Prettier**: (Add if needed)
- **File Naming**: kebab-case for files, PascalCase for components

### Testing

Currently, no automated tests are implemented. Future additions:

- **Backend**: Jest + Supertest for API testing
- **Frontend**: Vitest + React Testing Library
- **E2E**: Playwright or Cypress

## 🔐 Environment Variables

### Backend Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Server port | `3001` | No |
| `HOST` | Server host | `0.0.0.0` | No |
| `NODE_ENV` | Environment | `development` | No |
| `DATABASE_URL` | PostgreSQL connection string | - | **Yes** |
| `RATE_LIMIT_MAX` | Max requests per window | `100` | No |
| `RATE_LIMIT_WINDOW` | Rate limit window (ms) | `60000` | No |
| `CORS_ORIGIN` | Allowed CORS origin | `*` | No |
| `LOG_LEVEL` | Logging level | `info` | No |

### Frontend Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:3001` | No |

## 🎯 Design Decisions

### 1. **Drizzle ORM over Prisma**
   - **Why**: Drizzle provides better TypeScript inference, smaller bundle size, and direct SQL control
   - **Trade-off**: Less mature ecosystem, fewer GUI tools

### 2. **Fastify over Express**
   - **Why**: ~2x faster, built-in TypeScript support, schema validation, modern async/await
   - **Trade-off**: Smaller community, fewer middleware options

### 3. **Next.js App Router**
   - **Why**: Server components, improved performance, better SEO, modern React patterns
   - **Trade-off**: Learning curve for developers familiar with Pages Router

### 4. **Neon (Serverless Postgres)**
   - **Why**: Auto-scaling, automatic backups, generous free tier, SSL by default
   - **Trade-off**: Vendor lock-in, cold start latency

### 5. **Polling over WebSockets**
   - **Why**: Simpler implementation, no persistent connections, easier to scale
   - **Trade-off**: Higher latency, more network requests (mitigated with smart intervals)

### 6. **Anonymous Posting (No Auth)**
   - **Why**: Reduces friction, faster user adoption, simpler architecture
   - **Trade-off**: Potential for abuse (mitigated with rate limiting)

### 7. **Multi-stage Docker Builds**
   - **Why**: Smaller image size, faster deployments, production-optimized
   - **Trade-off**: Longer build times

### 8. **TypeScript Everywhere**
   - **Why**: Type safety, better DX, fewer runtime errors, excellent tooling
   - **Trade-off**: Initial setup complexity, build step required

## ⚖️ Trade-offs

### Performance vs. Simplicity

**Decision**: Polling with smart intervals (5s active, 30s inactive)
- ✅ Simple to implement and debug
- ✅ Works with any HTTP infrastructure
- ✅ Easier horizontal scaling
- ❌ Higher latency than WebSockets
- ❌ More bandwidth usage

**Alternative**: WebSockets would provide real-time updates but add complexity in load balancing and connection management.

### Security vs. Accessibility

**Decision**: Anonymous posting without authentication
- ✅ Zero friction for users
- ✅ No password management
- ✅ Privacy-friendly
- ❌ Potential for spam/abuse
- ❌ No user tracking

**Mitigation**: Rate limiting (100 requests/minute), input validation, character limits

### Flexibility vs. Performance

**Decision**: REST API over GraphQL
- ✅ Simpler to implement
- ✅ Better caching with HTTP
- ✅ Easier to monitor and debug
- ❌ Over-fetching data
- ❌ Multiple round trips

**Alternative**: GraphQL would allow precise data fetching but requires additional tooling and learning curve.

### Development Speed vs. Code Quality

**Decision**: No automated testing initially
- ✅ Faster initial development
- ✅ Focus on core features
- ❌ Technical debt
- ❌ Harder to refactor safely

**Future**: Add comprehensive test suite before scaling team or features.

## 🔮 Future Enhancements

### Short Term
- [ ] Add automated testing (Jest, React Testing Library, Playwright)
- [ ] Implement WebSocket support for real-time updates
- [ ] Add search and filtering for ideas
- [ ] Implement pagination with infinite scroll
- [ ] Add analytics and monitoring (Sentry, LogRocket)
- [ ] Improve error messages and user feedback

### Medium Term
- [ ] User authentication (optional, for profiles)
- [ ] Comment system for ideas
- [ ] Categories and tags for ideas
- [ ] Image upload support
- [ ] Rich text editor for descriptions
- [ ] Email notifications (trending ideas)
- [ ] Admin dashboard for moderation

### Long Term
- [ ] AI-powered idea suggestions
- [ ] Collaborative editing
- [ ] Integration with third-party services (Slack, Discord)
- [ ] Mobile apps (React Native)
- [ ] Advanced analytics dashboard
- [ ] Multi-language support (i18n)
- [ ] Dark mode toggle (currently auto)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Created as a full-stack developer assessment project.

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Fastify Documentation](https://www.fastify.io/docs/)
- [Drizzle ORM Documentation](https://orm.drizzle.team/docs/overview)
- [Neon Database](https://neon.tech/)
- [Tailwind CSS](https://tailwindcss.com/)

---

**Built with ❤️ using TypeScript, Next.js, Fastify, and PostgreSQL**
