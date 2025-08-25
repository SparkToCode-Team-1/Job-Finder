# Job Finder Application

A full-stack job finder application built with React (Frontend) and Spring Boot (Backend).

## Tech Stack

### Frontend

- React 18.3.1 with TypeScript
- Tailwind CSS for styling
- Multi-language support (Arabic/English) with RTL
- React Router DOM for navigation
- Axios for API calls
- FontAwesome icons

### Backend

- Spring Boot 3.5.4 with Java 17
- Spring Security with JWT authentication
- Spring Data JPA for database operations
- PostgreSQL database
- Maven for dependency management

## Features

- 🌐 Multi-language support (Arabic/English)
- 🔐 User authentication with JWT
- 💼 Job management system
- 📱 Responsive design
- 🎨 Modern UI with animations
- 📊 Database with PostgreSQL

## Getting Started

### Prerequisites

- Java 17+
- Node.js 16+
- PostgreSQL 12+
- Maven 3.6+

### Database Setup

1. Install and start PostgreSQL
2. Run the database setup script:
   ```bash
   cd backend
   psql -U postgres -f src/main/resources/db/setup-postgresql.sql
   ```

### Backend Setup

```bash
cd backend
./mvnw spring-boot:run
```

The backend will run on: http://localhost:8080

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

The frontend will run on: http://localhost:3000

## API Endpoints

- `GET /api/jobs` - Get all jobs
- `GET /api/jobs/{id}` - Get job by ID
- `POST /api/jobs` - Create new job
- `PUT /api/jobs/{id}` - Update job
- `DELETE /api/jobs/{id}` - Delete job
- `POST /api/jobs/add-sample` - Add sample data

## Project Structure

```
Job-Finder-frontEnd/
├── frontend/          # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── contexts/
│   │   └── types/
├── backend/           # Spring Boot backend
│   ├── src/main/java/com/jobs/jobs/
│   │   ├── controllers/
│   │   ├── entities/
│   │   ├── repositories/
│   │   ├── services/
│   │   └── security/
│   └── src/main/resources/
└── README.md
```

## License

This project is licensed under the MIT License.
