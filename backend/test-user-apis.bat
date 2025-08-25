@echo off
echo Testing User Management APIs...
echo.

REM Set the base URL
set BASE_URL=http://localhost:8080

echo 1. Testing User Registration:
curl -X POST %BASE_URL%/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"fullName\":\"احمد محمد\",\"email\":\"ahmed@example.com\",\"password\":\"password123\"}"
echo.
echo.

echo 2. Testing User Login:
curl -X POST %BASE_URL%/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"ahmed@example.com\",\"password\":\"password123\"}"
echo.
echo.

echo 3. Add Sample Jobs (for testing applications):
curl -X POST %BASE_URL%/api/jobs/add-sample
echo.
echo.

REM You would need to replace TOKEN with actual JWT token from login response
echo Note: For the following APIs, you need to add Authorization header with JWT token
echo Example: -H "Authorization: Bearer YOUR_JWT_TOKEN"
echo.

echo 4. Get User Profile (requires authentication):
echo curl -X GET %BASE_URL%/api/users/profile -H "Authorization: Bearer YOUR_TOKEN"
echo.

echo 5. Update User Profile (requires authentication):
echo curl -X PUT %BASE_URL%/api/users/profile -H "Authorization: Bearer YOUR_TOKEN" -H "Content-Type: application/json" -d "{\"fullName\":\"احمد محمد المحدث\",\"email\":\"ahmed@example.com\",\"phone\":\"+964123456789\",\"location\":\"بغداد، العراق\",\"bio\":\"مطور برمجيات خبرة 5 سنوات\",\"skills\":\"Java, Spring Boot, React\"}"
echo.

echo 6. Apply for Job (requires authentication):
echo curl -X POST %BASE_URL%/api/users/apply -H "Authorization: Bearer YOUR_TOKEN" -H "Content-Type: application/json" -d "{\"jobId\":1,\"coverLetter\":\"أعتقد أنني مناسب لهذه الوظيفة\"}"
echo.

echo 7. Get User Applications (requires authentication):
echo curl -X GET %BASE_URL%/api/users/applications -H "Authorization: Bearer YOUR_TOKEN"
echo.

echo 8. Get User Stats (requires authentication):
echo curl -X GET %BASE_URL%/api/users/stats -H "Authorization: Bearer YOUR_TOKEN"
echo.

pause
