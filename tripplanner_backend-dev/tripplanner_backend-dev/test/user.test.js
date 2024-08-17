const request = require('supertest');
const app = require('../app'); // Assuming this is your Express app

const User = require('../models/User');

describe('User API endpoints', () => {
  const sampleUser = {
    username: 'testuser',
    email: 'testuser@example.com',
    photo: 'test.jpg',
    role: 'user',
  };

  let createdUserId;

  beforeEach(async () => {
    const newUser = new User(sampleUser);
    const savedUser = await newUser.save();
    createdUserId = savedUser._id;
  });

  afterEach(async () => {
    await User.findByIdAndDelete(createdUserId);
  });

  it('should update an existing user', async () => {
    const updatedUser = {
      id: 'updatedId',
      username: 'updateduser',
      email: 'updateduser@example.com',
      photo: 'updated.jpg',
      role: 'admin',
    };

    const response = await request(app)
      .put(`/users/${createdUserId}`)
      .send(updatedUser);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(200);
    expect(response.body.user._id).toBe(String(createdUserId));
    expect(response.body.user._id).toBe(updatedUser.id);
    expect(response.body.user.username).toBe(updatedUser.username);
    expect(response.body.user.email).toBe(updatedUser.email);
    expect(response.body.user.photo).toBe(updatedUser.photo);
    expect(response.body.user.role).toBe(updatedUser.role);
  });

  it('should delete an existing user', async () => {
    const response = await request(app).delete(`/users/${createdUserId}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Successfully Deleted User');
  });

  it('should retrieve a single user', async () => {
    const response = await request(app).get(`/users/${createdUserId}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data._id).toBe(String(createdUserId));
    expect(response.body.data.username).toBe(sampleUser.username);
    expect(response.body.data.email).toBe(sampleUser.email);
    expect(response.body.data.photo).toBe(sampleUser.photo);
    expect(response.body.data.role).toBe(sampleUser.role);
  });

  it('should retrieve all users', async () => {
    const response = await request(app).get('/users');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.length).toBeGreaterThan(0);
  });
});
