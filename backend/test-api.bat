@echo off
echo Testing Job Finder API...
echo.

echo 1. Testing API Status:
curl -s http://localhost:8080/api/jobs/status
echo.
echo.

echo 2. Adding Sample Jobs:
curl -s -X POST http://localhost:8080/api/jobs/add-sample
echo.
echo.

echo 3. Getting All Jobs:
curl -s http://localhost:8080/api/jobs
echo.
echo.

echo 4. Testing complete!
pause
