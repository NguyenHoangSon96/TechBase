const request = require('supertest');

const app = require('../../app');
const { connectDB } = require('../../database/mongoDb');
const Medicine = require('../../models/medicine');

beforeAll(async () => {
  jest.setTimeout(3000);
  await connectDB();
})

describe('findMedicineByName controller success case', () => {
  beforeEach(async () => {
    const promiseArr = [];
    const dataArr = [
      {
        name: "Paracetamol",
        expiredDate: "2020/08/11",
        price: 2500,
        amount: 18,
        unit: "BOX",
        note: "Thuoc nhut dau"
      },
      {
        name: "Neopeptine",
        expiredDate: "2020/08/11",
        price: 3000,
        amount: 100,
        unit: "BOX",
        note: "Thuoc kho tieu"
      },
      {
        name: "Panadol",
        expiredDate: "2020/08/11",
        price: 2000,
        amount: 22,
        unit: "BOX",
        note: "Thuoc nhut dau"
      },
    ];
    dataArr.forEach(item => {
      const medicine = new Medicine(item);
      promiseArr.push(medicine.save());
    });
    await Promise.all(promiseArr);
  });

  afterEach(async () => {
    await Medicine.deleteMany({});
  })

  it('should return document like expected', async () => {
    const response = await request(app)
      .get(`/medicine/find-by-name?name=pa`)
      .set('Accept', 'application/json')
      .set('api-key', process.env.API_KEY)

    expect(response.body.find(item => item.name = 'Panadol')).toBeTruthy;
    expect(response.body.find(item => item.name = 'Paracetamol')).toBeTruthy;
  });
});

describe('findMedicineByName controller failed case', () => {
  beforeEach(async () => {
    const promiseArr = [];
    const dataArr = [
      {
        name: "Paracetamol",
        expiredDate: "2020/08/11",
        price: 2500,
        amount: 18,
        unit: "BOX",
        note: "Thuoc nhut dau"
      },
      {
        name: "Neopeptine",
        expiredDate: "2020/08/11",
        price: 3000,
        amount: 100,
        unit: "BOX",
        note: "Thuoc kho tieu"
      },
      {
        name: "Panadol",
        expiredDate: "2020/08/11",
        price: 2000,
        amount: 22,
        unit: "BOX",
        note: "Thuoc nhut dau"
      },
    ];
    dataArr.forEach(item => {
      const medicine = new Medicine(item);
      promiseArr.push(medicine.save());
    });
    await Promise.all(promiseArr);
  });

  afterEach(async () => {
    await Medicine.deleteMany({});
  })

  it('should return document like expected', async () => {
    const response = await request(app)
      .get(`/medicine/find-by-name?name=oresol`)
      .set('Accept', 'application/json')
      .set('api-key', process.env.API_KEY)

    expect(response.text).toMatch('Medicine name not exist');
  });
});

afterAll(async () => {
  await Medicine.deleteMany({});
})
