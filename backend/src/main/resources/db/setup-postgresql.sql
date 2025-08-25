-- PostgreSQL Database Setup Script for Job Finder Application
-- Run this script as a PostgreSQL superuser (e.g., postgres)

-- Create database for production
CREATE DATABASE jobfinder;

-- Create database for development
CREATE DATABASE jobfinder_dev;

-- Create user
CREATE USER jobfinder_user WITH PASSWORD 'jobfinder_password';

-- Grant all privileges on both databases
GRANT ALL PRIVILEGES ON DATABASE jobfinder TO jobfinder_user;
GRANT ALL PRIVILEGES ON DATABASE jobfinder_dev TO jobfinder_user;

-- Connect to production database and grant schema privileges
\c jobfinder;
GRANT ALL ON SCHEMA public TO jobfinder_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO jobfinder_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO jobfinder_user;

-- Connect to development database and grant schema privileges
\c jobfinder_dev;
GRANT ALL ON SCHEMA public TO jobfinder_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO jobfinder_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO jobfinder_user;

-- Display created databases
\l jobfinder*
