@echo off
echo Starting PostgreSQL Database Setup for Job Finder...
echo.

echo Step 1: Connecting to PostgreSQL...
echo Please enter your postgres user password when prompted.
echo.

REM Check if PostgreSQL is running
echo Checking if PostgreSQL service is running...
sc query postgresql-x64-14 >nul 2>&1
if %errorlevel% neq 0 (
    echo PostgreSQL service not found. Trying different service names...
    sc query postgresql >nul 2>&1
    if %errorlevel% neq 0 (
        echo Warning: PostgreSQL service not detected. Make sure PostgreSQL is installed and running.
        echo.
    )
)

echo.
echo Creating database and user...
echo Run the following commands in psql:
echo.
echo CREATE DATABASE jobfinder;
echo CREATE USER admin WITH PASSWORD 'admin';
echo GRANT ALL PRIVILEGES ON DATABASE jobfinder TO admin;
echo \q
echo.
echo Then press any key to test the connection...
pause

echo.
echo Testing connection to new database...
psql -U admin -d jobfinder -c "SELECT version();"

if %errorlevel% equ 0 (
    echo.
    echo SUCCESS: Database connection established!
    echo Your Spring Boot application should now be able to connect.
) else (
    echo.
    echo ERROR: Could not connect to database. Please check:
    echo 1. PostgreSQL is running
    echo 2. User 'admin' exists with password 'admin'
    echo 3. Database 'jobfinder' exists
    echo 4. User has proper permissions
)

echo.
pause
