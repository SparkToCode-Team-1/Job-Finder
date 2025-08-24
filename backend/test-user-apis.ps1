# PowerShell script to test User APIs

$baseUrl = "http://localhost:8080"

Write-Host "=== Testing Job Finder User APIs ===" -ForegroundColor Green
Write-Host ""

# Test 1: Add sample jobs
Write-Host "1. Adding sample jobs..." -ForegroundColor Yellow
try {
    $result = Invoke-RestMethod -Uri "$baseUrl/api/jobs/add-sample" -Method Post
    Write-Host "✓ Sample jobs added: $result" -ForegroundColor Green
} catch {
    Write-Host "✗ Failed to add sample jobs: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 2: Register user
Write-Host "2. Registering new user..." -ForegroundColor Yellow
$registerData = @{
    fullName = "أحمد محمد"
    email = "ahmed@example.com"
    password = "password123"
} | ConvertTo-Json

try {
    $registerResponse = Invoke-RestMethod -Uri "$baseUrl/api/auth/register" -Method Post -ContentType "application/json" -Body $registerData
    Write-Host "✓ User registered successfully" -ForegroundColor Green
    Write-Host "Token: $($registerResponse.token.Substring(0,20))..." -ForegroundColor Cyan
    Write-Host "User ID: $($registerResponse.user.id)" -ForegroundColor Cyan
    
    # Save token for next requests
    $global:token = $registerResponse.token
} catch {
    Write-Host "✗ Registration failed: $($_.Exception.Message)" -ForegroundColor Red
    
    # Try login if user already exists
    Write-Host "Trying to login instead..." -ForegroundColor Yellow
    $loginData = @{
        email = "ahmed@example.com"
        password = "password123"
    } | ConvertTo-Json
    
    try {
        $loginResponse = Invoke-RestMethod -Uri "$baseUrl/api/auth/login" -Method Post -ContentType "application/json" -Body $loginData
        Write-Host "✓ User logged in successfully" -ForegroundColor Green
        $global:token = $loginResponse.token
    } catch {
        Write-Host "✗ Login also failed: $($_.Exception.Message)" -ForegroundColor Red
        exit
    }
}
Write-Host ""

# Test 3: Get user profile
Write-Host "3. Getting user profile..." -ForegroundColor Yellow
$headers = @{ Authorization = "Bearer $global:token" }
try {
    $profile = Invoke-RestMethod -Uri "$baseUrl/api/users/profile" -Method Get -Headers $headers
    Write-Host "✓ Profile retrieved successfully" -ForegroundColor Green
    Write-Host "Name: $($profile.fullName)" -ForegroundColor Cyan
    Write-Host "Email: $($profile.email)" -ForegroundColor Cyan
} catch {
    Write-Host "✗ Failed to get profile: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 4: Update user profile
Write-Host "4. Updating user profile..." -ForegroundColor Yellow
$updateData = @{
    fullName = "أحمد محمد المحدث"
    email = "ahmed@example.com"
    phone = "+964123456789"
    location = "بغداد، العراق"
    bio = "مطور برمجيات خبرة 5 سنوات"
    skills = "Java, Spring Boot, React"
    experience = "خبرة في تطوير تطبيقات الويب"
    education = "بكالوريوس علوم حاسوب"
} | ConvertTo-Json

try {
    $updatedProfile = Invoke-RestMethod -Uri "$baseUrl/api/users/profile" -Method Put -ContentType "application/json" -Body $updateData -Headers $headers
    Write-Host "✓ Profile updated successfully" -ForegroundColor Green
    Write-Host "New name: $($updatedProfile.fullName)" -ForegroundColor Cyan
    Write-Host "Location: $($updatedProfile.location)" -ForegroundColor Cyan
} catch {
    Write-Host "✗ Failed to update profile: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 5: Get jobs list
Write-Host "5. Getting jobs list..." -ForegroundColor Yellow
try {
    $jobs = Invoke-RestMethod -Uri "$baseUrl/api/jobs" -Method Get
    Write-Host "✓ Found $($jobs.Count) jobs" -ForegroundColor Green
    
    if ($jobs.Count -gt 0) {
        $firstJob = $jobs[0]
        Write-Host "First job: $($firstJob.title) at $($firstJob.company)" -ForegroundColor Cyan
        
        # Test 6: Apply for job
        Write-Host ""
        Write-Host "6. Applying for job..." -ForegroundColor Yellow
        $applicationData = @{
            jobId = $firstJob.id
            coverLetter = "أعتقد أنني مناسب لهذه الوظيفة بسبب خبرتي في تطوير البرمجيات"
            resumeUrl = "https://example.com/resume.pdf"
        } | ConvertTo-Json
        
        try {
            $application = Invoke-RestMethod -Uri "$baseUrl/api/users/apply" -Method Post -ContentType "application/json" -Body $applicationData -Headers $headers
            Write-Host "✓ Applied for job successfully" -ForegroundColor Green
            Write-Host "Application ID: $($application.id)" -ForegroundColor Cyan
            Write-Host "Status: $($application.status)" -ForegroundColor Cyan
        } catch {
            Write-Host "✗ Failed to apply for job: $($_.Exception.Message)" -ForegroundColor Red
        }
    }
} catch {
    Write-Host "✗ Failed to get jobs: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 7: Get user applications
Write-Host "7. Getting user applications..." -ForegroundColor Yellow
try {
    $applications = Invoke-RestMethod -Uri "$baseUrl/api/users/applications" -Method Get -Headers $headers
    Write-Host "✓ Found $($applications.Count) applications" -ForegroundColor Green
    
    if ($applications.Count -gt 0) {
        foreach ($app in $applications) {
            Write-Host "- $($app.jobTitle) at $($app.companyName) - Status: $($app.status)" -ForegroundColor Cyan
        }
    }
} catch {
    Write-Host "✗ Failed to get applications: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 8: Get user stats
Write-Host "8. Getting user statistics..." -ForegroundColor Yellow
try {
    $stats = Invoke-RestMethod -Uri "$baseUrl/api/users/stats" -Method Get -Headers $headers
    Write-Host "✓ Statistics retrieved successfully" -ForegroundColor Green
    Write-Host "Total Applications: $($stats.totalApplications)" -ForegroundColor Cyan
    Write-Host "Pending Applications: $($stats.pendingApplications)" -ForegroundColor Cyan
    Write-Host "Accepted Applications: $($stats.acceptedApplications)" -ForegroundColor Cyan
} catch {
    Write-Host "✗ Failed to get stats: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

Write-Host "=== Testing Complete ===" -ForegroundColor Green
