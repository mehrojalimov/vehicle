const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index');

const credentials = require('../env.json');

const connectionString = `mongodb+srv://${credentials.Username}:${credentials.Password}@vehicleapi.ed7ug.mongodb.net/Vehicles?retryWrites=true&w=majority`;


beforeAll(async () => {
  await mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Vehicle API', () => {
  let vin = '1HGCM82633A004352';

  test('POST /vehicle should create a new vehicle', async () => {
    const vehicleData = {
      manufacturer_name: "Toyota",
      description: "A reliable car",
      horse_power: 200,
      model_name: "Camry",
      model_year: 2021,
      purchase_price: 22000.00,
      fuel_type: "Petrol",
      vin: vin
    };

    const response = await request(app)
      .post('/vehicle')
      .send(vehicleData)
      .expect('Content-Type', /json/)
      .expect(201);

    expect(response.body).toMatchObject({ vin: vin });
  });

  test('GET /vehicle should return all vehicles', async () => {
    const response = await request(app)
      .get('/vehicle')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(Array.isArray(response.body)).toBeTruthy();
  });

  test('GET /vehicle/:vin should return a vehicle', async () => {
    const response = await request(app)
      .get(`/vehicle/${vin}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.vin).toBe(vin);
  });

  test('PUT /vehicle/:vin should update the vehicle', async () => {
    const updatedData = {
      manufacturer_name: "Toyota",
      description: "An extremely reliable car",
      horse_power: 205,
    };

    const response = await request(app)
      .put(`/vehicle/${vin}`)
      .send(updatedData)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.description).toBe("An extremely reliable car");
    expect(response.body.horse_power).toBe(205);
  });

  test('DELETE /vehicle/:vin should delete the vehicle', async () => {
    await request(app)
      .delete(`/vehicle/${vin}`)
      .expect(204);
  });

  test('POST /vehicle should handle invalid data', async () => {
    const invalidData = {};

    await request(app)
      .post('/vehicle')
      .send(invalidData)
      .expect('Content-Type', /json/)
      .expect(422);
  });
});
