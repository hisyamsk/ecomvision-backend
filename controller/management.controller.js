import mongoose from 'mongoose';
import UserModel from '../models/User.model.js';

export async function getAdmins(req, res) {
  try {
    const admins = await UserModel.find({ role: 'admin' }).select('-password');
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
}
