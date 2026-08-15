# Project 3 - Authentication System

A robust Node.js backend authentication system using JSON Web Tokens (JWT) for user authentication and authorization, featuring protected routes, input validation, and user ID management logic.

## 🚀 Features

- **User Authentication**: Secure JWT-based signup/login flow.
- **Protected Routes**: Middleware to guard endpoints and ensure only authorized users gain access.
- **Input Validation & ID Assignment**: Robust validation logic and user ID generation.
- **Modular Project Structure**: Clean separation of `routes`, `middleware`, and server configuration.

## 📁 Project Structure

```text
project3-auth/
├── middleware/       # Custom middleware (JWT verification, etc.)
├── routes/           # Express routes (auth, users, protected routes)
├── .gitignore        # Ignored files and folders
├── package.json      # Dependencies and scripts
├── server.js         # Entry point of the Express server
└── README.md         # Project documentation
