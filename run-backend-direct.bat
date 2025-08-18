@echo off
echo Trying to start Spring Boot application without Maven wrapper...
cd /d "c:\Users\NITRO V 15\Desktop\rhal FrontEnd\backend"

echo Setting environment variables for H2 database...
set SPRING_PROFILES_ACTIVE=dev
set APP_JWT_SECRET=mySecretKey123456789012345678901234567890

echo Checking Java version...
java -version

echo.
echo Attempting to run with minimal classpath...
echo This will try to start the Spring Boot application directly.
echo.

REM Try to find the main class and run it
echo Looking for compiled classes...
if exist "target\classes" (
    echo Found compiled classes, attempting to run...
    java -cp "target\classes;target\lib\*" -Dspring.profiles.active=dev com.jobs.jobs.JobsApplication
) else (
    echo No compiled classes found. You need to compile the project first.
    echo Please use an IDE like IntelliJ IDEA or Eclipse to:
    echo 1. Open the backend folder as a Maven project
    echo 2. Let the IDE download dependencies
    echo 3. Run the main class: com.jobs.jobs.JobsApplication
    echo.
    echo Or try installing Maven directly from: https://maven.apache.org/download.cgi
)

pause
