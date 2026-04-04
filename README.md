# Node.js Template

## Assignment 6

### Authentication

- Passwords are hashed with bcrypt in user creation and user update.
- Login endpoint: POST /api/v1/auth/login
- Me endpoint: GET /api/v1/auth/me
- JWT token is signed with JWT_SECRET from .env and expires in 24h.

### Authorization Rules

- Regular user:
  - Can update/delete only own user record.
  - Can update/delete only own cats.
- Admin user:
  - Can update/delete any user.
  - Can update/delete any cat.

Authorization is based on decoded token payload in res.locals.user.

### Protected Endpoints

- PUT /api/v1/users/:id
- DELETE /api/v1/users/:id
- PUT /api/v1/cats/:id
- DELETE /api/v1/cats/:id
- GET /api/v1/auth/me

Use header:

Authorization: Bearer <token>

### REST Client Examples

POST http://localhost:3000/api/v1/auth/login
content-type: application/json

{
"username": "JohnDoe",
"password": "to-be-hashed-pw1"
}

GET http://localhost:3000/api/v1/auth/me
Authorization: Bearer <token>

### CORS

- CORS is enabled with app.use(cors()) in app.
