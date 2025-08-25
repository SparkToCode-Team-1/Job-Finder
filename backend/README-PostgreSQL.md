# PostgreSQL Setup Instructions

## Prerequisites

- Install PostgreSQL on your system
- Make sure PostgreSQL service is running
- Have access to PostgreSQL as superuser (postgres)

## Database Setup

### 1. Connect to PostgreSQL as superuser:

```bash
psql -U postgres
```

### 2. Run the setup script:

```sql
\i src/main/resources/db/setup-postgresql.sql
```

OR run the commands manually:

```sql
-- Create databases
CREATE DATABASE jobfinder;
CREATE DATABASE jobfinder_dev;

-- Create user
CREATE USER jobfinder_user WITH PASSWORD 'jobfinder_password';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE jobfinder TO jobfinder_user;
GRANT ALL PRIVILEGES ON DATABASE jobfinder_dev TO jobfinder_user;
```

### 3. Verify the setup:

```sql
\l jobfinder*
\du jobfinder_user
```

## Configuration

The application is now configured to use:

### Production Database:

- **URL:** `jdbc:postgresql://localhost:5432/jobfinder`
- **Username:** `jobfinder_user`
- **Password:** `jobfinder_password`

### Development Database:

- **URL:** `jdbc:postgresql://localhost:5432/jobfinder_dev`
- **Username:** `jobfinder_user`
- **Password:** `jobfinder_password`

## Running the Application

### Default Profile (Production):

```bash
./mvnw spring-boot:run
```

### Development Profile:

```bash
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
```

## Database Management

### Connect to production database:

```bash
psql -U jobfinder_user -d jobfinder
```

### Connect to development database:

```bash
psql -U jobfinder_user -d jobfinder_dev
```

## Notes

- The application will automatically create tables on first run using JPA/Hibernate
- Development profile uses `create-drop` DDL mode (recreates tables on each run)
- Production profile uses `update` DDL mode (preserves data between runs)
- H2 database has been completely removed from the project
