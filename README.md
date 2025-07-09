# Subscriber App

A full-stack subscriber management application built with Node.js, TypeScript, and Express.js backend with a modern frontend interface.

## Features

- User subscription management
- Database support for PostgreSQL and MySQL
- RESTful API architecture
- TypeScript for type safety
- Database migrations with Sequelize

## Tech Stack

**Backend:**
- Node.js
- TypeScript
- Express.js
- Sequelize ORM
- PostgreSQL
- CORS enabled
- Copy `.env.example` in the `backend` directory to `.env` and fill in your actual database credentials.

**Frontend:**
- Modern JavaScript framework (runs on port 3000)
- **Do NOT commit your real `.env` file to version control.**
- Create a `.env` file in the `frontend` directory with the following (replace with your own secret for production):
  ```env
  NEXTAUTH_SECRET=your-secret-here
  NEXTAUTH_URL=http://localhost:3000
  ```
- You may also provide a `.env.example` in the `frontend` directory for collaborators to copy.

**Never commit real secrets or production credentials to your repository!**

## Prerequisites

Before running this application, make sure you have the following installed:
- Node.js (v14 or higher)
- Bun runtime
- PostgreSQL or MySQL database
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Intelligent-AI-Solutions-DS-Team/subscriber-app.git
cd subscriber-app
```

2. Install dependencies for both frontend and backend:
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

## Database Setup

1. Configure your database connection in the backend configuration files
2. Run database migrations:
```bash
cd backend
npm run db:migrate --config config/config.cjs
```

To undo migrations if needed:
```bash
npm run db:migrate:undo
```

## Running the Application

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Build the TypeScript code:
```bash
npx tsc --project tsconfig.backend.json
```

3. Start the backend server:
```bash
bun run start
```

The backend server will run on **port 3001**.

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Start the development server:
```bash
npm run dev
```

The frontend will run on **port 3000**.

## API Endpoints

The backend provides RESTful API endpoints for subscriber management. The server runs on `http://localhost:3001`.

## Development

### Backend Development

- **Build check**: `npm run build:check` - Type-check the TypeScript code
- **Database migrations**: `npm run db:migrate --config config/config.cjs` - Apply database migrations
- **Start server**: `bun run start` - Run the compiled application

### Project Structure

```
subscriber-app/
├── frontend/          # Frontend application
│   └── ...
├── backend/           # Backend API
│   ├── src/          # TypeScript source files
│   ├── dist/         # Compiled JavaScript files
│   ├── package.json
│   └── tsconfig.backend.json
└── README.md
```

## Configuration

The backend uses path aliases configured in `tsconfig.backend.json`:
- `@/*` maps to `./src/*` for cleaner imports

## Dependencies

### Backend Dependencies
- **express**: Web framework
- **sequelize**: ORM for database operations
- **cors**: Cross-origin resource sharing
- **typescript**: Type checking and compilation

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests (when available)
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

If you encounter any issues or have questions, please open an issue in the repository.

---

**Quick Start Summary:**
1. `cd frontend && npm install && npm run dev` (runs on port 3000)
2. `cd backend && npm install && npx tsc --project tsconfig.backend.json && bun run start` (runs on port 3001)