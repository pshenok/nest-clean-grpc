# Clean Architecture NestJS API with gRPC

## 📋 Prerequisites

- Node.js (v18+)
- PostgreSQL
- pnpm or npm

## 🛠️ Installation

1. Install dependencies
```bash
pnpm install
```

2. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your database credentials
```

3. Generate Prisma client
```bash
npm run prisma:generate
```

4. Run database migrations
```bash
npm run prisma:migrate
```

5. Generate proto files
```bash
npm run proto:generate
```

## 🚀 Running the Application

### Development (Hybrid Mode - REST + gRPC)
```bash
npm run start:dev
```

### Production
```bash
npm run build
npm run start:prod
```

### Separate Servers
```bash
# REST API only
node dist/main.js

# gRPC only
node dist/main-grpc.js

# Both (Hybrid)
node dist/main-hybrid.js
```

## 📚 API Documentation

### REST API
Once the application is running, you can access the Swagger documentation at:
```
http://localhost:3000/docs
```

### gRPC API
The gRPC server runs on port 5000 by default. Use any gRPC client to connect.

## 🏗️ Architecture

The project follows clean architecture principles with the following layers:

### API Layer (`src/api/`)
REST controllers and route handlers

### gRPC Layer (`src/grpc/`)
gRPC services and proto definitions

### Domain Layer (`src/domain/`)
Business logic and domain models

### Infrastructure Layer (`src/infra/`)
External dependencies and data access

### Core Layer (`src/core/`)
Cross-cutting concerns (config, logging, filters)

## 🔗 API Endpoints

### REST Endpoints

#### Users
- **POST** `/api/users` - Create a new user
- **GET** `/api/users` - Get all users with pagination
- **GET** `/api/users/:id` - Get user by ID
- **PUT** `/api/users/:id` - Update user
- **DELETE** `/api/users/:id` - Delete user
- **GET** `/api/users/stats` - Get user statistics

#### Health
- **GET** `/api/health` - Health check

### gRPC Services

#### UserService
- `CreateUser` - Create a new user
- `GetUser` - Get user by ID
- `GetUsers` - Get all users with pagination
- `UpdateUser` - Update user
- `DeleteUser` - Delete user
- `GetUserStats` - Get user statistics

#### HealthService
- `Check` - Health check

## 📄 User Model

```typescript
{
  id: string (UUID)
  fullName: string
  email: string (unique)
  createdAt: Date
  updatedAt: Date
}
```

## 🧪 Testing

### Unit Tests
```bash
npm run test
```

### E2E Tests
```bash
npm run test:e2e
```

### Test Coverage
```bash
npm run test:cov
```

### gRPC Client Example
```bash
npx ts-node scripts/grpc-client-example.ts
```

## 📦 Database Management

### View database with Prisma Studio
```bash
npm run prisma:studio
```

### Create a new migration
```bash
npx prisma migrate dev --name migration_name
```

## 🎯 Example API Calls

### REST API

#### Create User
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"fullName": "John Doe", "email": "john@example.com"}'
```

#### Get All Users
```bash
curl http://localhost:3000/api/users?skip=0&take=10
```

### gRPC API

Use the provided client example or any gRPC client tool like `grpcurl`:

```bash
# List services
grpcurl -plaintext localhost:5000 list

# Create user
grpcurl -plaintext -d '{"fullName": "John Doe", "email": "john@example.com"}' \
  localhost:5000 user.UserService/CreateUser
```

## 🐳 Docker

Build and run with Docker Compose:
```bash
docker-compose up
```
