const request = require('supertest');

const app = require('../../app');
const { connectDB } = require('../../database/mongoDb');
const Medicine = require('../../models/medicine');

beforeAll(async () => {
  jest.setTimeout(3000);
  await connectDB();
})

describe('removeMedicineByName controller success case', () => {
  afterEach(async () => {
    await Medicine.deleteMany({});
  })

  it('should return message Remove medicine success and delete document on mongo', async () => {
    const medicineName = 'Panadol Extra';
    const medicine = new Medicine({
      name: medicineName,
      expiredDate: "2020/08/11",
      price: 20000,
      amount: 12,
      unit: "BOX",
      note: "Thuoc nhut dau"
    });
    await medicine.save();

    const response = await request(app)
      .get(`/medicine/remove-by-name?name=${medicineName}`)
      .set('Accept', 'application/json')
      .set('api-key', process.env.API_KEY)
    expect(response.text).toMatch('Remove medicine success');

    const medicineDocument = await Medicine.findOne({ name: medicineName });
    expect(medicineDocument).toBeNull();
  });
});

describe('removeMedicineByName controller failed case', () => {
  afterEach(async () => {
    await Medicine.deleteMany({});
  })

  it('should return message Medicine name not exist', async () => {
    const medicineName = 'Panadol Extra';
    const medicine = new Medicine({
      name: medicineName,
      expiredDate: "2020/08/11",
      price: 20000,
      amount: 12,
      unit: "BOX",
      note: "Thuoc nhut dau"
    });
    await medicine.save();

    const response = await request(app)
      .get(`/medicine/remove-by-name?name=wrongName`)
      .set('Accept', 'application/json')
      .set('api-key', process.env.API_KEY)
    expect(response.status).toEqual(400);
    expect(response.text).toMatch('Medicine name not exist');

    const medicineDocument = await Medicine.findOne({ name: medicineName });
    expect(medicineDocument).toBeDefined();
  });
});

afterAll(async () => {
  await Medicine.deleteMany({});
})
