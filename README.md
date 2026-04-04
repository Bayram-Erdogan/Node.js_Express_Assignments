# Node.js Express Assignments

This repository contains assignment-based development for a Node.js + Express REST API.

## Branch Review (updated)

All branches were inspected.

| Branch      | Latest commit | Merged to main | Notes                                                     |
| ----------- | ------------- | -------------- | --------------------------------------------------------- |
| Assignment1 | b764779       | yes            | API + static files                                        |
| Assignment2 | 70e0bca       | yes            | Project restructure + cat/user endpoints                  |
| Assignment3 | 242e752       | yes            | Latest commit is formatting; branch is not merged to main |
| Assignment4 | b251040       | yes            | Assignment4 branch added                                  |
| Assignment5 | 8c28fa6       | yes            | Assignment 5 completed                                    |
| Assignment6 | 6a843ee       | yes            | Assignment 6 docs and formatting                          |
| Assignment7 | eb83bf4       | yes            | Error handling + input validation                         |
| main        | 094c588       | -              | Merge Assignment7                                         |

## Branch URLs

- [main](https://github.com/Bayram-Erdogan/Node.js_Express_Assignments/tree/main)
- [Assignment1](https://github.com/Bayram-Erdogan/Node.js_Express_Assignments/tree/Assignment1)
- [Assignment2](https://github.com/Bayram-Erdogan/Node.js_Express_Assignments/tree/Assignment2)
- [Assignment3](https://github.com/Bayram-Erdogan/Node.js_Express_Assignments/tree/Assignment3)
- [Assignment4](https://github.com/Bayram-Erdogan/Node.js_Express_Assignments/tree/Assignment4)
- [Assignment5](https://github.com/Bayram-Erdogan/Node.js_Express_Assignments/tree/Assignment5)
- [Assignment6](https://github.com/Bayram-Erdogan/Node.js_Express_Assignments/tree/Assignment6)
- [Assignment7](https://github.com/Bayram-Erdogan/Node.js_Express_Assignments/tree/Assignment7)

## Current Main Features

Main currently includes Assignment7 changes.

- Centralized JSON error handling middleware.
- Not-found handler for unknown routes.
- Request validation and sanitization with express-validator.
- Multer upload filtering for media files and size limit handling.
- Authentication and authorization flow from Assignment6 (JWT + role checks).

## Key API Endpoints

- POST /api/v1/auth/login
- GET /api/v1/auth/me
- GET /api/v1/users
- POST /api/v1/users
- PUT /api/v1/users/:id
- DELETE /api/v1/users/:id
- GET /api/v1/cats
- POST /api/v1/cats
- PUT /api/v1/cats/:id
- DELETE /api/v1/cats/:id

## Auth Notes

- Passwords are hashed with bcrypt.
- JWT is signed with JWT_SECRET from .env.
- Protected routes require header: Authorization: Bearer <token>

## Run

1. Install dependencies:

npm install

2. Start the server:

npm run start

3. Development mode:

npm run dev
