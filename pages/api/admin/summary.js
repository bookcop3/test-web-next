import { getSession } from 'next-auth/react';
import db from '../../../utils/db';
import User from '../../../models/User';
import Product_H from '../../../models/Product_H';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || (session && !session.user.isAdmin)) {
    return res.status(401).send('signin required');
  }

  await db.connect();

  const usersCount = await User.countDocuments();
  const productsCount = await Product_H.countDocuments();

  const userPriceGroup = await User.aggregate([
    {
      $group: {
        _id: null,
        sales: { $sum: '$totalUser' },
      },
    },
  ]);
  const userPrice = userPriceGroup.length > 0 ? userPriceGroup[0].sales : 0;

  const salesData = await User.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
        totalSales: { $sum: '$totalUser' },
      },
    },
  ]);

  await db.disconnect();
  res.send({ usersCount, productsCount, salesData, userPrice });
};

export default handler;
