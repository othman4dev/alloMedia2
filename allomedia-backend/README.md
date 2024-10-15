# alloMedia - Home Delivery Service Application

alloMedia is a full-stack home delivery service application built using MongoDB, Express, and Node.js. The application includes features such as user authentication with JWT and 2FA, CRUD operations for client orders, delivery tracking, and an admin management system.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Packages Used](#packages-used)
- [API Endpoints](#api-endpoints)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Environment Variables](#environment-variables)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Contribution](#contribution)

## Features
- User registration with email verification (OTP-based)
- User login with OTP for 2FA
- Password reset functionality
- JWT-based authentication
- CRUD operations for managing client orders
- Delivery tracking system for users
- Admin management dashboard for overseeing orders and clients

## Technologies Used
- **Node.js**: Backend runtime
- **Express.js**: Web framework for handling requests
- **MongoDB**: NoSQL database for storing user and order data
- **JWT**: Token-based authentication for users
- **OTP (One-Time Password)**: Used for 2FA and email verification
- **SendGrid or Nodemailer**: For sending emails

## Packages Used
The following npm packages are used in this project:
- `express`: Web framework
- `mongoose`: MongoDB object modeling
- `jsonwebtoken`: For creating and verifying JWTs
- `crypto`: Built-in Node.js module for generating OTPs and tokens
- `express-session`: Session management for password reset flow
- `cookie-parser`: For handling cookies in authentication
- `bcryptjs`: For hashing passwords
- `nodemailer`: For sending emails (configured with SendGrid)
- `dotenv`: For managing environment variables

You can install all the required packages by running:
```bash
npm install
```

## API Endpoints

### Auth Routes

#### Register a new user
`POST /api/auth/register`
- Registers a new user and sends an email verification link.
- **Request Body:**
  ```json
  {
    "name": "User Name",
    "email": "user@example.com",
    "password": "Password123!",
    "confirmPassword": "Password123!",
    "phoneNumber": "1234567890",
    "address": "User Address"
  }
  ```
- **Response:**
  ```json
  {
    "message": "User registered successfully! Please check your email to verify your account."
  }
  ```

#### Verify Email
`GET /api/auth/verify-email/:token`
- Verifies the user's email with the provided token.

#### Login a user
`POST /api/auth/login`
- Logs in the user, sends an OTP for two-factor authentication (2FA).
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "Password123!"
  }
  ```
- **Response:**
  ```json
  {
    "message": "OTP sent to your email",
    "userId": "USER_ID"
  }
  ```

#### Verify OTP
`POST /api/auth/verify-otp`
- Verifies the OTP and logs in the user.
- **Request Body:**
  ```json
  {
    "userId": "USER_ID",
    "otp": "123456"
  }
  ```
- **Response:**
  ```json
  {
    "message": "OTP verified successfully, Login was successful",
    "token": "JWT_TOKEN"
  }
  ```

#### Forgot Password
`POST /api/auth/forgot-password`
- Sends an OTP to the user's email for password reset.
- **Request Body:**
  ```json
  {
    "email": "user@example.com"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Email sent"
  }
  ```

#### Reset Password
`POST /api/auth/reset-password`
- Resets the user's password using the provided token.
- **Request Body:**
  ```json
  {
    "token": "123456",
    "password": "NewPassword123!",
    "confirmPassword": "NewPassword123!"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Password updated successfully"
  }
  ```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/alloMedia.git
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   Create a `.env` file in the root directory and configure the following variables:
   ```
   MONGO_URI=your-mongodb-connection-string
   JWT_SECRET=your-jwt-secret
   NODE_ENV=development
   EMAIL_SERVICE=your-email-service
   EMAIL_USER=your-email-username
   EMAIL_PASS=your-email-password
   ```

4. Start the server:
```bash
npm run dev
```

5. You can run Test by using the command
```bash
npm test
```

## Running the Project
- The application runs on **localhost:5000** by default.
- You can access the API routes at **http://localhost:5000/api/
auth/**.
- You can use Postman or any other API client to test the endpoints.
## Environment Variables
Make sure to configure the following environment variables in your `.env` file:

- **MONGO_URI**: MongoDB connection string.
- **JWT_SECRET**: Secret key for signing JWT tokens.
- **EMAIL_SERVICE**: Email provider for sending verification emails (e.g., Gmail, SendGrid).
- **EMAIL_USER**: Username for the email provider.
- **EMAIL_PASS**: Password for the email provider.

## Testing

The project uses the Jest testing framework for testing. You can run the tests using the following command:
```bash
npm test
```

The test suite includes unit tests for the auth routes and controllers.

## Project Structure

The project structure is as follows:

```bash
    alloMedia/
    ├── config/
    │   └── db.js
    ├── controllers/
    │   └── authController.js
    ├── middleware/
    │   └── authMiddleware.js
    ├── models/
    │   └── User.js
    ├── routes/
    │   └── authRoutes.js
    ├── tests/
    │   └── auth.test.js
    ├── utils/
    │   └── sendEmail.js
    ├── .env
    ├── .gitignore
    ├── app.js
    ├── package.json
    └── README.md
```


## Contribution

Contributions are welcome! Feel free to submit a pull request or open an issue.

---

_This README was generated for the alloMedia project, a home delivery service platform._

