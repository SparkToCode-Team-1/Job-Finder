# إضافة البيانات الوهمية للاختبار
Write-Host "إضافة وظائف وهمية للاختبار..." -ForegroundColor Green

# إضافة وظائف وهمية
try {
    $response = Invoke-RestMethod -Uri "http://localhost:8080/api/jobs/add-sample" -Method POST
    Write-Host "✅ نتيجة إضافة الوظائف: $response" -ForegroundColor Green
} catch {
    Write-Host "❌ خطأ في إضافة الوظائف: $($_.Exception.Message)" -ForegroundColor Red
}

# التحقق من حالة قاعدة البيانات
try {
    $status = Invoke-RestMethod -Uri "http://localhost:8080/api/jobs/status" -Method GET
    Write-Host "📊 حالة قاعدة البيانات: $status" -ForegroundColor Blue
} catch {
    Write-Host "❌ خطأ في التحقق من حالة قاعدة البيانات: $($_.Exception.Message)" -ForegroundColor Red
}

# عرض جميع الوظائف
try {
    $jobs = Invoke-RestMethod -Uri "http://localhost:8080/api/jobs" -Method GET
    Write-Host "📋 الوظائف المتاحة:" -ForegroundColor Yellow
    foreach ($job in $jobs) {
        Write-Host "  - $($job.title) في $($job.company) - $($job.location)" -ForegroundColor Cyan
    }
} catch {
    Write-Host "❌ خطأ في جلب الوظائف: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n🚀 يمكنك الآن اختبار التسجيل على: http://localhost:3000" -ForegroundColor Magenta
