# User Management API Documentation

## Authentication APIs

### 1. Register User

**POST** `/api/auth/register`

**Request Body:**

```json
{
  "fullName": "أحمد محمد",
  "email": "ahmed@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "user": {
    "id": 1,
    "fullName": "أحمد محمد",
    "email": "ahmed@example.com",
    "role": "USER",
    "createdAt": "2025-08-24T00:24:51.080Z"
  }
}
```

### 2. Login User

**POST** `/api/auth/login`

**Request Body:**

```json
{
  "email": "ahmed@example.com",
  "password": "password123"
}
```

**Response:** Same as register

---

## User Profile APIs

### 3. Get User Profile

**GET** `/api/users/profile`

**Headers:** `Authorization: Bearer <token>`

**Response:**

```json
{
  "id": 1,
  "fullName": "أحمد محمد",
  "email": "ahmed@example.com",
  "role": "USER",
  "phone": "+964123456789",
  "location": "بغداد، العراق",
  "bio": "مطور برمجيات خبرة 5 سنوات",
  "skills": "Java, Spring Boot, React",
  "experience": "خبرة في تطوير تطبيقات الويب",
  "education": "بكالوريوس علوم حاسوب",
  "resumeUrl": "https://example.com/resume.pdf"
}
```

### 4. Update User Profile

**PUT** `/api/users/profile`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**

```json
{
  "fullName": "أحمد محمد المحدث",
  "email": "ahmed@example.com",
  "phone": "+964123456789",
  "location": "بغداد، العراق",
  "bio": "مطور برمجيات خبرة 5 سنوات",
  "skills": "Java, Spring Boot, React, PostgreSQL",
  "experience": "خبرة في تطوير تطبيقات الويب والـ APIs",
  "education": "بكالوريوس علوم حاسوب - جامعة بغداد",
  "resumeUrl": "https://example.com/updated-resume.pdf"
}
```

---

## Job Application APIs

### 5. Apply for Job

**POST** `/api/users/apply`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**

```json
{
  "jobId": 1,
  "coverLetter": "أعتقد أنني مناسب لهذه الوظيفة بسبب خبرتي في...",
  "resumeUrl": "https://example.com/resume.pdf"
}
```

**Response:**

```json
{
  "id": 1,
  "userId": 1,
  "userFullName": "أحمد محمد",
  "jobId": 1,
  "jobTitle": "Senior Software Engineer",
  "companyName": "Tech Solutions Inc",
  "status": "PENDING",
  "appliedAt": "2025-08-24T00:30:00Z",
  "coverLetter": "أعتقد أنني مناسب...",
  "resumeUrl": "https://example.com/resume.pdf"
}
```

### 6. Get User Applications

**GET** `/api/users/applications`

**Headers:** `Authorization: Bearer <token>`

**Response:** Array of applications (same format as above)

### 7. Check if Applied for Job

**GET** `/api/users/applications/check/{jobId}`

**Headers:** `Authorization: Bearer <token>`

**Response:**

```json
{
  "hasApplied": true,
  "status": "PENDING"
}
```

### 8. Withdraw Application

**DELETE** `/api/users/applications/{applicationId}`

**Headers:** `Authorization: Bearer <token>`

**Response:** `"Application withdrawn successfully"`

### 9. Get User Statistics

**GET** `/api/users/stats`

**Headers:** `Authorization: Bearer <token>`

**Response:**

```json
{
  "totalApplications": 5,
  "pendingApplications": 2,
  "acceptedApplications": 1
}
```

---

## Application Status Values

- `PENDING` - قيد المراجعة
- `UNDER_REVIEW` - تحت المراجعة
- `ACCEPTED` - مقبول
- `REJECTED` - مرفوض
- `WITHDRAWN` - منسحب

---

## Error Responses

All APIs may return error responses in this format:

```json
"Error message description"
```

Common HTTP status codes:

- `200` - Success
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (missing or invalid token)
- `403` - Forbidden (access denied)
- `404` - Not Found
- `409` - Conflict (e.g., email already exists)

---

## Testing Examples

### Using cURL:

1. **Register:**

```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"fullName":"أحمد محمد","email":"ahmed@example.com","password":"password123"}'
```

2. **Get Profile:** (replace TOKEN with actual JWT)

```bash
curl -X GET http://localhost:8080/api/users/profile \
  -H "Authorization: Bearer TOKEN"
```

3. **Apply for Job:**

```bash
curl -X POST http://localhost:8080/api/users/apply \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"jobId":1,"coverLetter":"أعتقد أنني مناسب لهذه الوظيفة"}'
```
