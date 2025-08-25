-- PostgreSQL Database Setup Script for Job Finder Application
-- Run this script as PostgreSQL superuser (postgres)

-- Create database for production
CREATE DATABASE jobfinder
    WITH 
    OWNER = admin
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;

-- Create user admin if not exists
DO
$do$
BEGIN
   IF NOT EXISTS (
      SELECT FROM pg_catalog.pg_roles
      WHERE  rolname = 'admin') THEN

      CREATE USER admin WITH PASSWORD 'admin';
   END IF;
END
$do$;

-- Grant all privileges on database
GRANT ALL PRIVILEGES ON DATABASE jobfinder TO admin;

-- Connect to the database and grant schema privileges
\c jobfinder;

-- Grant schema privileges
GRANT ALL ON SCHEMA public TO admin;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO admin;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO admin;

-- Set default privileges for future tables and sequences
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO admin;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO admin;

-- Display created database
\l jobfinder;
