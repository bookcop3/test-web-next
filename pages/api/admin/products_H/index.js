import { getSession } from 'next-auth/react';
import Product_H from '../../../../models/Product_H';
import db from '../../../../utils/db';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || !session.user.isAdmin) {
    return res.status(401).send('admin signin required');
  }
  // const { user } = session;
  if (req.method === 'GET') {
    return getHandler(req, res);
  } else if (req.method === 'POST') {
    return postHandler(req, res);
  } else {
    return res.status(400).send({ message: 'Method not allowed' });
  }
};

const postHandler = async (req, res) => {
  await db.connect();
  const newProduct_H = new Product_H({
    name: '',
    address: '',
    city: '',
    price_type: '',
    price: '',
  });

  const product = await newProduct_H.save();
  await db.disconnect();
  res.send({ message: 'Product created successfully', product });
};

const getHandler = async (req, res) => {
  await db.connect();
  const products = await Product_H.find({});
  await db.disconnect();
  res.send(products);
};

export default handler;
