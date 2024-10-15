const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/User');

jest.setTimeout(10000);

describe('Authentication Tests', () => {
  beforeAll(async () => {
    const mongoURI = process.env.MONGO_URI_TEST;
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  let registerToken = '';  // Changed to let
  let loginToken = '';     // Changed to let
  let userId = '';         // Changed to let
  let forgotToken = '';    // Changed to let

  /* 
  All tests : 
  1. Register a new user
  2. Verify user email
  3. Register a user with an existing email
  4. Login a user with valid credentials
  5. Verify OTP
  6. Login a user with invalid password
  7. Forgot password
  8. Reset password
  */

  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Othman Kharbouch',
        email: 'otmankharbouch813@gmail.com',
        password: 'Test1234#',
        confirmPassword: 'Test1234#',
        phoneNumber: '0667478994',
        address: '123 Test St',
      });

    expect(response.statusCode).toBe(200);
    const message = response.body.message;
    registerToken = response.body.token;
    console.log(registerToken);
    expect(response.body).toHaveProperty('token');
  }, 10000); // Timeout is set

  it('should verify user email', async () => {
    const response = await request(app)
      .get(`/api/auth/verify-email/${registerToken}`)
      .send({
        token: registerToken,  // Ensure you're passing the correct token
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Email verified successfully! You can now log in.');
  });

  it('should not register a user with an existing email', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'otmankharbouch813@gmail.com',
        password: 'Test1234#',
        confirmPassword: 'Test1234#',
        phoneNumber: '1234567890',
        address: '123 Test St',
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('User already exists');
  });

  it('should login a user with valid credentials', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'otmankharbouch813@gmail.com',
        password: 'Test1234#',
      });

    expect(response.statusCode).toBe(200);
    const message = response.body.message;
    loginToken = response.body.token;
    userId = response.body.userId;
    expect(message === 'OTP sent to your email' ||
      message === 'OTP verified successfully, login successful' ||
      message === 'Login successful').toBeTruthy();
  }, 10000);

  it('should verify OTP', async () => {
    const response = await request(app)
      .post('/api/auth/verify-otp')
      .send({
        userId: userId,
        otp: loginToken,
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('OTP verified successfully, login successfull');
  });

  it('should not login a user with invalid password', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'otmankharbouch813@gmail.com',
        password: 'WrongPassword',
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Invalid email or password');
  }, 10000);

  it('forgot password', async () => {
    const response = await request(app)
      .post('/api/auth/forgot-password')
      .send({
        email: 'otmankharbouch813@gmail.com',
      });

    expect(response.statusCode).toBe(200);
    forgotToken = response.body.token;
    console.log(forgotToken);
    expect(response.body.message).toBe('Email sent');
  });

  it('should reset password', async () => {
    const response = await request(app)
      .post('/api/auth/reset-password')
      .send({
        token: forgotToken,
        password: 'Test1234#2',
        confirmPassword: 'Test1234#2',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Password updated successfully');
  });
});