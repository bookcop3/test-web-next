import { getSession } from 'next-auth/react';
import History_H from '../../../../models/History_H';
import db from '../../../../utils/db';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || (session && !session.user.isAdmin)) {
    return res.status(401).send('signin required');
  }

  await db.connect();
  const history = await History_H.find({});
  await db.disconnect();
  res.send(history);
};

export default handler;
