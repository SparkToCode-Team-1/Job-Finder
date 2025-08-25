@echo off
echo === Testing User Management APIs ===
echo.

echo 1. Adding sample jobs...
powershell -Command "try { $result = Invoke-RestMethod -Uri 'http://localhost:8080/api/jobs/add-sample' -Method Post; Write-Host \"Success: $result\" } catch { Write-Host \"Error: $_\" }"
echo.

echo 2. Registering new user...
powershell -Command "try { $body = '{\"fullName\":\"احمد محمد\",\"email\":\"ahmed@example.com\",\"password\":\"password123\"}'; $result = Invoke-RestMethod -Uri 'http://localhost:8080/api/auth/register' -Method Post -ContentType 'application/json' -Body $body; Write-Host \"Success: User ID $($result.user.id), Token: $($result.token.Substring(0,20))...\" } catch { Write-Host \"Error: $_\" }"
echo.

echo 3. Testing login...
powershell -Command "try { $body = '{\"email\":\"ahmed@example.com\",\"password\":\"password123\"}'; $result = Invoke-RestMethod -Uri 'http://localhost:8080/api/auth/login' -Method Post -ContentType 'application/json' -Body $body; Write-Host \"Success: Login successful, Token: $($result.token.Substring(0,20))...\" } catch { Write-Host \"Error: $_\" }"
echo.

echo 4. Getting jobs list...
powershell -Command "try { $result = Invoke-RestMethod -Uri 'http://localhost:8080/api/jobs' -Method Get; Write-Host \"Success: Found $($result.Count) jobs\" } catch { Write-Host \"Error: $_\" }"
echo.

pause
