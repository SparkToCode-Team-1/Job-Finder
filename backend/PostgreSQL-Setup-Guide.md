# دليل ربط PostgreSQL مع مشروع Job Finder

## 📋 المتطلبات المسبقة

- تأكد من تثبيت PostgreSQL على جهازك
- تأكد من تشغيل خدمة PostgreSQL
- تأكد من معرفة كلمة مرور مستخدم postgres

## 🚀 خطوات الإعداد

### الطريقة الأولى: استخدام psql مباشرة

1. **افتح Command Prompt كمدير (Run as Administrator)**

2. **اتصل بـ PostgreSQL:**

   ```cmd
   psql -U postgres
   ```

3. **أنشئ قاعدة البيانات والمستخدم:**

   ```sql
   CREATE DATABASE jobfinder;
   CREATE USER admin WITH PASSWORD 'admin';
   GRANT ALL PRIVILEGES ON DATABASE jobfinder TO admin;
   \q
   ```

4. **اختبر الاتصال:**
   ```cmd
   psql -U admin -d jobfinder
   ```

### الطريقة الثانية: استخدام Script تلقائي

1. **شغل الـ batch file:**

   ```cmd
   cd backend
   setup-postgres.bat
   ```

2. **أو شغل SQL script:**
   ```cmd
   psql -U postgres -f setup-db.sql
   ```

## 🔧 إعدادات التطبيق الحالية

في ملف `application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/jobfinder
spring.datasource.username=admin
spring.datasource.password=admin
```

## ✅ اختبار الاتصال

بعد الإعداد، شغل Spring Boot:

```cmd
cd backend
./mvnw spring-boot:run
```

إذا رأيت رسائل مثل:

- `HikariPool-1 - Start completed`
- `Started JobsApplication in X seconds`

فهذا يعني أن الاتصال نجح! 🎉

## ❌ حل المشاكل الشائعة

### مشكلة: `password authentication failed`

**الحل:** تأكد من صحة كلمة المرور أو غير إعدادات application.properties

### مشكلة: `database "jobfinder" does not exist`

**الحل:** أنشئ قاعدة البيانات:

```sql
psql -U postgres
CREATE DATABASE jobfinder;
```

### مشكلة: `role "admin" does not exist`

**الحل:** أنشئ المستخدم:

```sql
CREATE USER admin WITH PASSWORD 'admin';
GRANT ALL PRIVILEGES ON DATABASE jobfinder TO admin;
```

### مشكلة: خدمة PostgreSQL لا تعمل

**الحل:** شغل الخدمة:

```cmd
net start postgresql-x64-14
# أو
services.msc (ثم ابحث عن PostgreSQL وشغله)
```

## 📊 التحقق من نجاح الإعداد

1. **اتصل بقاعدة البيانات:**

   ```cmd
   psql -U admin -d jobfinder
   ```

2. **تحقق من الجداول (بعد تشغيل Spring Boot):**

   ```sql
   \dt
   SELECT * FROM jobs;
   ```

3. **أضف بيانات تجريبية:**
   زُر: `http://localhost:8080/api/jobs/add-sample`
