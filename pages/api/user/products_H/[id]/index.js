import { getSession } from 'next-auth/react';
import Product_H from '../../../../../models/Product_H';
import db from '../../../../../utils/db';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
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
    product.postp.address = req.body.address;
    product.postp.city = req.body.city;
    product.postp.price_type = req.body.price_type;
    product.postp.price = req.body.price;
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
