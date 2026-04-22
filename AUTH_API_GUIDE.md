# Authentication API Guide

## Setup Requirements

### 1. Environment Variables (.env)

Create a `.env` file in the root directory with:

```
PORT=5000
JWT_SECRET=your_super_secret_key_here
NODE_ENV=development

# Database Configuration
CLOUD_NAME=your_database_name
CLOUD_USER=your_database_user
CLOUD_PASSWORD=your_database_password
CLOUD_HOST=your_database_host
```

### 2. Database Setup

Make sure you've run the migrations to create tables:

```bash
npx sequelize-cli db:migrate
```

## API Endpoints

### 1. Register (Đăng Ký)

**Endpoint:** `POST /api/auth/register`

**Request Body:**

```json
{
  "fullname": "Nguyễn Văn A",
  "email": "user@example.com",
  "phone": "0123456789",
  "password": "SecurePassword123",
  "username": "nguyenvana"
}
```

**Success Response (201):**

```json
{
  "error": 0,
  "message": "Đăng ký tài khoản thành công. Cảm ơn quý khách hàng !",
  "user": {
    "id": 1,
    "codeuser": "U1704067200000",
    "phone": "0123456789",
    "fullname": "Nguyễn Văn A"
  }
}
```

**Error Response (400):**

```json
{
  "error": 1,
  "message": "Số điện thoại đã tồn tại !"
}
```

---

### 2. Login (Đăng Nhập)

**Endpoint:** `POST /api/auth/login`

**Request Body:**

```json
{
  "phone": "0123456789",
  "password": "SecurePassword123"
}
```

**Success Response (200):**

```json
{
  "error": 0,
  "message": "Đăng nhập tài khoản thành công.",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "codeuser": "U1704067200000",
    "phone": "0123456789",
    "fullname": "Nguyễn Văn A",
    "email": "user@example.com",
    "rolecode": "R3"
  }
}
```

**Error Response (401):**

```json
{
  "error": 1,
  "message": "Sai mật khẩu !"
}
```

---

## Using JWT Token

### Store Token

After login, save the `access_token` in localStorage/sessionStorage:

```javascript
const token = response.data.access_token;
localStorage.setItem("access_token", token);
```

### Send Token in Requests

Include the token in Authorization header:

```javascript
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
```

---

## Protected Routes Example

### Using Middleware

```javascript
const verifyToken = require("../middlewares/verifyToken.middleware");
const verifyRole = require("../middlewares/verifyRole.middleware");

// Protect route with token verification
router.get("/profile", verifyToken, controller.getProfile);

// Protect route with role verification (admin only)
router.delete(
  "/users/:id",
  verifyToken,
  verifyRole("R1"),
  controller.deleteUser,
);

// Multiple roles allowed
router.post(
  "/courses",
  verifyToken,
  verifyRole("R1", "R2"),
  controller.createCourse,
);
```

---

## User Roles (Example)

- **R1**: Admin
- **R2**: Instructor
- **R3**: Student (Default)

---

## Error Codes

| Code | Status                   | Description                        |
| ---- | ------------------------ | ---------------------------------- |
| 0    | Success                  | Operation successful               |
| 1    | Bad Request/Unauthorized | Validation or authentication error |

---

## Frontend Integration Example (React)

### Login Component

```javascript
import axios from "axios";

const handleLogin = async (phone, password) => {
  try {
    const response = await axios.post("http://localhost:5000/api/auth/login", {
      phone,
      password,
    });

    if (response.data.error === 0) {
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      // Redirect to dashboard
      window.location.href = "/dashboard";
    } else {
      alert(response.data.message);
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("Lỗi kết nối server");
  }
};
```

### Register Component

```javascript
const handleRegister = async (formData) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/register",
      {
        fullname: formData.fullname,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        username: formData.username,
      },
    );

    if (response.data.error === 0) {
      alert("Đăng ký thành công! Vui lòng đăng nhập");
      // Redirect to login
      window.location.href = "/login";
    } else {
      alert(response.data.message);
    }
  } catch (error) {
    console.error("Register error:", error);
    alert("Lỗi kết nối server");
  }
};
```

### Protected API Call

```javascript
const fetchUserProfile = async () => {
  const token = localStorage.getItem("access_token");

  try {
    const response = await axios.get(
      "http://localhost:5000/api/users/profile",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("access_token");
      window.location.href = "/login";
    }
  }
};
```

---

## Testing with REST Client

### Register

```http
POST http://localhost:5000/api/auth/register HTTP/1.1
Content-Type: application/json

{
  "fullname": "Nguyễn Văn A",
  "email": "user@example.com",
  "phone": "0123456789",
  "password": "SecurePassword123",
  "username": "nguyenvana"
}
```

### Login

```http
POST http://localhost:5000/api/auth/login HTTP/1.1
Content-Type: application/json

{
  "phone": "0123456789",
  "password": "SecurePassword123"
}
```

### Protected Request

```http
GET http://localhost:5000/api/users/profile HTTP/1.1
Authorization: Bearer your_jwt_token_here
```

---

## Security Notes

1. **Password Hashing**: Passwords are hashed using bcryptjs with 10-round salt
2. **Token Expiration**: JWT tokens expire after 7 days
3. **Environment Variables**: Keep JWT_SECRET secure, never commit .env to git
4. **HTTPS**: Use HTTPS in production
5. **CORS**: Configure CORS properly to allow frontend requests

---

## Troubleshooting

### "Token không tồn tại"

- Make sure you're sending Authorization header
- Format: `Authorization: Bearer <token>`

### "Token đã hết hạn"

- User needs to login again to get a new token
- Implement token refresh mechanism for better UX

### "Không có quyền truy cập"

- User's role doesn't have permission for this route
- Check user's rolecode and route's allowed roles

### Database Connection Error

- Check .env file credentials
- Make sure MySQL/database is running
- Verify CLOUD_HOST is correct
