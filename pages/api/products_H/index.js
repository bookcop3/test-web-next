import { getSession } from 'next-auth/react';
import History_H from '../../../models/History_H';
import Product_H from '../../../models/Product_H';
import TestProduc from '../../../models/TestProduc';
import db from '../../../utils/db';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send('signin required');
  }

  const { user } = session;
  await db.connect();
  const newProduct_H = new Product_H({
    ...req.body,
    user: user._id,
  });

  const newHistory = new History_H({
    ...req.body,
    user: user._id,
  });

  const newProduct_Test = new TestProduc({
    ...req.body,
  });
  const history = await newHistory.save();
  res.status(201).send(history);

  const product = await newProduct_H.save();
  res.status(201).send(product);

  const product_t = await newProduct_Test.save();
  res.status(201).send(product_t);
};
export default handler;
