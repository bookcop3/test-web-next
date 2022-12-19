import bcryptjs from 'bcryptjs';
import User from '../../../models/User';
import db from '../../../utils/db';

async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }
  const { name, email, password, phone_number } = req.body;
  if (
    !name ||
    !email ||
    !email.includes('@') ||
    !phone_number ||
    !password ||
    password.trim().length < 5
  ) {
    res.status(422).json({
      message: 'กรุณากรอกข้อมูลให้ถูกต้อง',
    });
    return;
  }

  await db.connect();

  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    res.status(422).json({ message: 'อีเมลนี้มีผู้ใช้งานแล้ว' });
    await db.disconnect();
    return;
  }

  await db.connect();

  const existingUser2 = await User.findOne({ phone_number: phone_number });
  if (existingUser2) {
    res.status(422).json({ message: 'เบอร์นี้มีผู้ใช้งานแล้ว' });
    await db.disconnect();
    return;
  }

  const newUser = new User({
    name,
    email,
    phone_number,
    password: bcryptjs.hashSync(password),
    isAdmin: false,
  });

  const user = await newUser.save();
  await db.disconnect();
  res.status(201).send({
    message: 'Created user!',
    _id: user._id,
    name: user.name,
    email: user.email,
    phone_number: user.phone_number,
    isAdmin: user.isAdmin,
  });
}

export default handler;
