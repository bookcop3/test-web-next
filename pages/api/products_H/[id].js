// /api/products/:id
import { getSession } from 'next-auth/react';
import Product_H from '../../../models/Product_H';
import db from '../../../utils/db';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send('signin required');
  }

  await db.connect();

  const product = await Product_H.findById(req.query.id);
  await db.send(product);
};

export default handler;
