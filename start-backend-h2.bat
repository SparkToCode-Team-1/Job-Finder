@echo off
echo Starting Spring Boot backend with H2 database...
cd /d "c:\Users\NITROV~1\Desktop\RHALFR~1\backend"

REM Set H2 database properties temporarily
set SPRING_PROFILES_ACTIVE=dev
set SPRING_DATASOURCE_URL=jdbc:h2:mem:jobfinder
set SPRING_DATASOURCE_DRIVER_CLASS_NAME=org.h2.Driver  
set SPRING_DATASOURCE_USERNAME=
set SPRING_DATASOURCE_PASSWORD=
set SPRING_JPA_HIBERNATE_DDL_AUTO=create-drop
set SPRING_H2_CONSOLE_ENABLED=true
set APP_JWT_SECRET=mySecretKey123456789012345678901234567890

echo Checking if Maven wrapper exists...
if not exist "mvnw.cmd" (
    echo Maven wrapper not found! 
    echo Please install Maven or ensure mvnw.cmd is available.
    pause
    exit /b 1
)

echo Starting with H2 in-memory database...
mvnw.cmd clean spring-boot:run -Dspring-boot.run.profiles=dev
pause
