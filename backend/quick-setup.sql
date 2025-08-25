-- تشغيل هذا الملف باستخدام:
-- psql -U postgres -f quick-setup.sql

-- إنشاء قاعدة البيانات
CREATE DATABASE jobfinder;

-- إنشاء المستخدم
CREATE USER admin WITH PASSWORD 'admin';

-- منح الصلاحيات
GRANT ALL PRIVILEGES ON DATABASE jobfinder TO admin;

-- الاتصال بقاعدة البيانات
\c jobfinder;

-- منح صلاحيات المخطط
GRANT ALL ON SCHEMA public TO admin;

-- رسالة تأكيد
SELECT 'Database setup completed successfully!' as status;
