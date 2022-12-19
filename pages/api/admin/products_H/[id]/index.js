import { getSession } from 'next-auth/react';
import Product_H from '../../../../../models/Product_H';
import db from '../../../../../utils/db';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || (session && !session.user.isAdmin)) {
    return res.status(401).send('signin required');
  }

  const { user } = session;
  if (req.method === 'GET') {
    return getHandler(req, res, user);
  } else if (req.method === 'PUT') {
    return putHandler(req, res, user);
  } else if (req.method === 'DELETE') {
    return deleteHandler(req, res, user);
  } else {
    return res.status(400).send({ message: 'Method not allowed' });
  }
};
const getHandler = async (req, res) => {
  await db.connect();
  const products = await Product_H.findById(req.query.id);
  await db.disconnect();
  res.send(products);
};
const putHandler = async (req, res) => {
  await db.connect();
  const product = await Product_H.findById(req.query.id);
  if (product) {
    product.postp.name = req.body.name;
    product.postp.category = req.body.category;
    product.postp.status_p = req.body.status_p;
    product.postp.status_o = req.body.status_o;
    product.postp.receive_m = req.body.receive_m;
    product.postp.price_type = req.body.price_type;
    product.postp.price = req.body.price;
    product.postp.price_h = req.body.price_h;
    product.postp2.area_p = req.body.area_p;
    product.postp2.floor = req.body.floor;
    product.postp2.room_b = req.body.room_b;
    product.postp2.room_t = req.body.room_t;
    product.postp2.details = req.body.details;
    product.postp2.address = req.body.address;
    product.postp2.city = req.body.city;
    product.postp2.image = req.body.image;
    await product.save();
    await db.disconnect();
    res.send({ message: 'Product updated successfully' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Product not found' });
  }
};

const deleteHandler = async (req, res) => {
  await db.connect();
  const product = await Product_H.findById(req.query.id);
  if (product) {
    await product.remove();
    await db.disconnect();
    res.send({ message: 'Product deleted successfully' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Product not found' });
  }
};

export default handler;
