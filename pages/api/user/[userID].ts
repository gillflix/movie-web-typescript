import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../utils/dbConnect';
import { useAPIAuth } from '../../../utils/useAPIAuth';
import User from '../../../models/user';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  await dbConnect();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const user = await useAPIAuth(req);
  if (!user) {
    return res.status(401).json({
      message: `You are unauthorized to view this page, please login first!`,
    });
  }
  const { uID } = req.query;
  const foundUser: any = User.findById(uID).lean();

  if (!foundUser) {
    return res.status(400).json({ message: `User not found` });
  }
  foundUser._id = foundUser.toString();
  foundUser.createdAt = foundUser.createdAt.getTime();
  foundUser.updatedAt = foundUser.updatedAt.getTime();
  return res.status(200).json(foundUser);
};

export default handler;
