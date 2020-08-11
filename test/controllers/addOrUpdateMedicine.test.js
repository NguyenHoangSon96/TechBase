const request = require('supertest');

const app = require('../../app');
const { connectDB } = require('../../database/mongoDb');
const Medicine = require('../../models/medicine');

beforeAll(async () => {
  jest.setTimeout(3000);
  await connectDB();
})

describe('addOrUpdateMedicine controller success case', () => {
  afterEach(async () => {
    await Medicine.deleteMany({});
  })

  it('should return message Add new medicine success', async () => {
    const data = {
      name: "Panadol",
      expiredDate: "2020/08/11",
      price: 2000,
      amount: 12,
      unit: "BOX",
      note: "Thuoc nhut dau"
    }
    const response = await request(app)
      .post(`/medicine/save`)
      .set('Accept', 'application/json')
      .set('api-key', process.env.API_KEY)
      .send(data);
    expect(response.text).toMatch('Add new medicine success');

    const medicineDocument = await Medicine.findOne({ name: 'Panadol' });
    expect(medicineDocument).toBeDefined();
  });
});

describe('addOrUpdateMedicine controller failed case', () => {
  afterEach(async () => {
    await Medicine.deleteMany({});
  })

  it('should return price must be numeric and positive number', async () => {
    const data = {
      name: "Panadol",
      expiredDate: "2020/08/11",
      price: "dsasa", // wrong param
      amount: 12,
      unit: "BOX",
      note: "Thuoc nhut dau"
    }
    const response = await request(app)
      .post(`/medicine/save`)
      .set('Accept', 'application/json')
      .set('api-key', process.env.API_KEY)
      .send(data);
    expect(response.body.errors[0].msg).toMatch('price must be numeric and positive number');

    const medicineDocument = await Medicine.findOne({ name: 'Panadol' });
    expect(medicineDocument).toBeNull();
  });

  it('should return expiredDate must be a datetime YYYY/MM/DD', async () => {
    const data = {
      name: "Panadol",
      expiredDate: "2020/0823211", // wrong param
      price: 20000,
      amount: 12,
      unit: "BOX",
      note: "Thuoc nhut dau"
    }
    const response = await request(app)
      .post(`/medicine/save`)
      .set('Accept', 'application/json')
      .set('api-key', process.env.API_KEY)
      .send(data);
    expect(response.body.errors[0].msg).toMatch('expiredDate must be a datetime YYYY/MM/DD');

    const medicineDocument = await Medicine.findOne({ name: 'Panadol' });
    expect(medicineDocument).toBeNull();
  });

  it('should return unit must be BOX or JAR or BLISTER PACKS', async () => {
    const data = {
      name: "Panadol",
      expiredDate: "2020/08/12",
      price: 20000,
      amount: 12,
      unit: "CAR", // wrong param
      note: "Thuoc nhut dau"
    }
    const response = await request(app)
      .post(`/medicine/save`)
      .set('Accept', 'application/json')
      .set('api-key', process.env.API_KEY)
      .send(data);
    expect(response.body.errors[0].msg).toMatch('unit must be BOX or JAR or BLISTER PACKS');

    const medicineDocument = await Medicine.findOne({ name: 'Panadol' });
    expect(medicineDocument).toBeNull();
  });
});

afterAll(async () => {
  await Medicine.deleteMany({});
})
