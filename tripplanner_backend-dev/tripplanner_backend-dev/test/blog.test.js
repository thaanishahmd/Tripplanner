// Import the necessary modules and functions
const request = require('supertest');
const app = require('../app'); // Assuming this is your Express app

// Import the Blog model
const Blog = require('../models/Blog');

describe('Blog API endpoints', () => {
  // Define a sample blog for testing
  const sampleBlog = {
    title: 'Test Blog',
    description: 'This is a test blog',
    city: 'Test City',
    image: 'test.jpg',
  };

  // Define a variable to store the created blog's ID
  let createdBlogId;

  // Run this before each test
  beforeEach(async () => {
    // Create a new blog and save it to the database
    const newBlog = new Blog(sampleBlog);
    const savedBlog = await newBlog.save();
    createdBlogId = savedBlog._id;
  });

  // Run this after each test
  afterEach(async () => {
    // Delete the blog created during the test
    await Blog.findByIdAndDelete(createdBlogId);
  });

  // Test the createBlog controller
  it('should create a new blog', async () => {
    const response = await request(app)
      .post('/blogs')
      .send(sampleBlog);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.title).toBe(sampleBlog.title);
    expect(response.body.data.description).toBe(sampleBlog.description);
    expect(response.body.data.city).toBe(sampleBlog.city);
    expect(response.body.data.image).toBe(sampleBlog.image);
  });

  // Test the updateBlog controller
  it('should update an existing blog', async () => {
    const updatedBlog = {
      title: 'Updated Test Blog',
      description: 'This is an updated test blog',
      city: 'Updated Test City',
      image: 'updated.jpg',
    };

    const response = await request(app)
      .put(`/blogs/${createdBlogId}`)
      .send(updatedBlog);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(200);
    expect(response.body.blog._id).toBe(String(createdBlogId));
    expect(response.body.blog.title).toBe(updatedBlog.title);
    expect(response.body.blog.description).toBe(updatedBlog.description);
    expect(response.body.blog.city).toBe(updatedBlog.city);
    expect(response.body.blog.image).toBe(updatedBlog.image);
  });

  // Test the deleteBlog controller
  it('should delete an existing blog', async () => {
    const response = await request(app).delete(`/blogs/${createdBlogId}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Successfully Deleted Blog');
  });

  // Test the getSingleBlog controller
  it('should retrieve a single blog', async () => {
    const response = await request(app).get(`/blogs/${createdBlogId}`);

    expect(response.status).toBe(200);
    expect(response.body.title).toBe(sampleBlog.title);
    expect(response.body.description).toBe(sampleBlog.description);
    expect(response.body.city).toBe(sampleBlog.city);
    expect(response.body.image).toBe(sampleBlog.image);
  });

  // Test the getAllBlogs controller
  it('should retrieve all blogs', async () => {
    const response = await request(app).get('/blogs');

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  // Test the getlatest controller
  it('should retrieve the latest 5 blogs', async () => {
    const response = await request(app).get('/blogs/latest');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(5);
  });
});
