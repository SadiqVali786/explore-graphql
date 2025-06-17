# 🐦 Twitter GraphQL Backend

A GraphQL-based backend powered by **Bun**, **Apollo Server**, **Prisma**, and **Docker**.

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/docs/installation)
- [Docker](https://www.docker.com/)
- PostgreSQL (automatically set up via Docker)

### 📦 Installation

```bash
bun install
```

### 🧪 Development

To spin up everything for development, just run:

```bash
bun run dev
```

This command will:

- Start PostgreSQL using Docker (`docker-compose`)
- Launch **Prisma Studio** in the background
- Run the server with hot-reloading using Bun

### ✅ Available Scripts

| Command               | Description                                       |
| --------------------- | ------------------------------------------------- |
| `bun run dev`         | Starts DB, Prisma Studio, and server (watch mode) |
| `bun run start`       | Runs the server without Docker or Prisma Studio   |
| `bun run lint`        | Runs ESLint with zero warnings allowed            |
| `bun run check-types` | Type-checks the codebase using TypeScript         |

### 📂 Project Structure

```
.
├── prisma/                          # Prisma schema and migration files
│   └── schema.prisma                # Defines DB models and relationships
├── src/                             # All application source code
│   ├── index.ts                     # Main entry point of the server
│   ├── graphql/                     # GraphQL schema and resolver modules
│   │   ├── user/                    # User-related GraphQL logic
│   │   │   ├── index.ts             # Combines all user GraphQL exports
│   │   │   ├── mutations.ts         # User mutation definitions (e.g., signup)
│   │   │   ├── queries.ts           # User query definitions (e.g., getProfile)
│   │   │   ├── resolvers.ts         # Resolver functions for user types
│   │   │   └── typeDefs.ts          # Type definitions for user GraphQL types
│   │   ├── post/                    # Post-related GraphQL logic (similar structure)
│   │   └── index.ts                 # Combines user, post, etc., into root schema
│   ├── lib/                         # Shared libraries and utilities
│   │   └── db.ts                    # Prisma client instance and DB connection logic
│   └── services/                    # Business logic layer
│       ├── user.ts                  # User-related service functions
│       └── post.ts                  # Post-related service functions
├── docker-compose.yml               # Docker config to spin up PostgreSQL DB
├── .eslintrc                        # ESLint config for code quality and style
├── tsconfig.json                    # TypeScript compiler configuration
```

### 🗃️ Database

- PostgreSQL is set up and managed using `docker-compose`.
- Prisma handles schema management and DB access.

### 🧰 Tech Stack

- [**Bun**](https://bun.sh/) – Runtime & package manager
- [**Apollo Server**](https://www.apollographql.com/docs/apollo-server/) – GraphQL API
- [**Prisma**](https://www.prisma.io/) – ORM
- [**Docker**](https://www.docker.com/) – For local database setup
- [**ESLint**](https://eslint.org/) – Code linting
- [**TypeScript**](https://www.typescriptlang.org/) – Type safety
