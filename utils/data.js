import bcrypt from 'bcryptjs';

const data = {
  products: [
    {
      post: {
        name: 'บ้านน่าอยู่',
        category: 'home',
        image: '/images/img2.jpg',
        price: '1500000',
      },
      post2: {
        name: 'test',
        adress: 'test',
      },
    },
    {
      post: {
        name: 'คอนโดน่าซื้อ',
        category: 'condo',
        image: '/images/img1.jpg',
        price: '1000000',
      },
      post2: {
        name: 'test',
        adress: 'test',
      },
    },
    {
      post: {
        name: 'ที่ดินน่าสร้างบ้าน',
        category: 'land',
        image: '/images/img3.jpg',
        price: '3000000',
      },
      post2: {
        name: 'test',
        adress: 'test',
      },
    },
  ],

  product_h: [
    {
      user: '',
      postp: {
        name: 'test',
        category: 'home',
        status_p: 'one',
        status_o: 'owner',
        receive_m: 'no',
        price_type: 'sale',
        price: '30000',
        price_h: '0',
      },
      postp2: {
        area_p: '250*250',
        floor: '1-2',
        room_b: '2',
        room_t: '2',
        details: 'บ้านน่าอยู่',
        image: '/images/img2.jpg',
        address: '31/1 ถ.ท่าบันได',
        city: 'ตรัง',
      },
    },
  ],

  users: [
    {
      name: 'admin',
      email: 'admin@gmail.com',
      password: bcrypt.hashSync('123456'),
      phone_number: '0991234567',
      isAdmin: true,
    },
    {
      name: 'Metas',
      email: 'user@gmail.com',
      password: bcrypt.hashSync('123456'),
      phone_number: '0981234567',
      isAdmin: false,
    },
  ],
};

export default data;
