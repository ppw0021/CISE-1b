import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../utils/dbConnect';
import User from '../models/User';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const users = await User.find({});
        res.status(200).json({ success: true, data: users });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
//     case 'POST':
//       try {
//         const user = await User.create(req.body);
//         res.status(201).json({ success: true, data: user });
//       } catch (error) {
//         res.status(400).json({ success: false, error });
//       }
//       break;
//     case 'PUT':
//       try {
//         const { id } = req.query;
//         const user = await User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
//         if (!user) {
//           return res.status(404).json({ success: false, error: 'User not found' });
//         }
//         res.status(200).json({ success: true, data: user });
//       } catch (error) {
//         res.status(400).json({ success: false, error });
//       }
//       break;
//     case 'DELETE':
//       try {
//         const { id } = req.query;
//         const deletedUser = await User.findByIdAndDelete(id);
//         if (!deletedUser) {
//           return res.status(404).json({ success: false, error: 'User not found' });
//         }
//         res.status(200).json({ success: true, data: {} });
//       } catch (error) {
//         res.status(400).json({ success: false, error });
//       }
//       break;
//     default:
//       res.status(405).json({ success: false, error: 'Method not allowed' });
//       break;
 }
};

export default handler;