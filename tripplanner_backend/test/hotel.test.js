const request = require('supertest');
const app = require('../app'); // Assuming this is your Express app

const Hotel = require('../models/Hotel');

describe('Hotel API endpoints', () => {
  const sampleHotel = {
    name: 'Test Hotel',
    description: 'This is a test hotel',
    city: 'Test City',
    roomCount: 10,
    image: 'test.jpg',
  };

  let createdHotelId;

  beforeEach(async () => {
    const newHotel = new Hotel(sampleHotel);
    const savedHotel = await newHotel.save();
    createdHotelId = savedHotel._id;
  });

  afterEach(async () => {
    await Hotel.findByIdAndDelete(createdHotelId);
  });

  it('should create a new hotel', async () => {
    const response = await request(app)
      .post('/hotels')
      .send(sampleHotel);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.name).toBe(sampleHotel.name);
    expect(response.body.data.description).toBe(sampleHotel.description);
    expect(response.body.data.city).toBe(sampleHotel.city);
    expect(response.body.data.roomCount).toBe(sampleHotel.roomCount);
    expect(response.body.data.image).toBe(sampleHotel.image);
  });

  it('should update an existing hotel', async () => {
    const updatedHotel = {
      name: 'Updated Test Hotel',
      description: 'This is an updated test hotel',
      city: 'Updated Test City',
      roomCount: 20,
      image: 'updated.jpg',
    };

    const response = await request(app)
      .put(`/hotels/${createdHotelId}`)
      .send(updatedHotel);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(200);
    expect(response.body.hotel._id).toBe(String(createdHotelId));
    expect(response.body.hotel.name).toBe(updatedHotel.name);
    expect(response.body.hotel.description).toBe(updatedHotel.description);
    expect(response.body.hotel.city).toBe(updatedHotel.city);
    expect(response.body.hotel.roomCount).toBe(updatedHotel.roomCount);
    expect(response.body.hotel.image).toBe(updatedHotel.image);
  });

  it('should delete an existing hotel', async () => {
    const response = await request(app).delete(`/hotels/${createdHotelId}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Successfully Deleted Hotel');
  });

  it('should retrieve a single hotel', async () => {
    const response = await request(app).get(`/hotels/${createdHotelId}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(sampleHotel.name);
    expect(response.body.description).toBe(sampleHotel.description);
    expect(response.body.city).toBe(sampleHotel.city);
    expect(response.body.roomCount).toBe(sampleHotel.roomCount);
    expect(response.body.image).toBe(sampleHotel.image);
  });

  it('should retrieve all hotels', async () => {
    const response = await request(app).get('/hotels');

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should retrieve the latest 5 hotels', async () => {
    const response = await request(app).get('/hotels/latest');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(5);
  });
});
