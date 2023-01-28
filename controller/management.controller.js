import mongoose from 'mongoose';
import UserModel from '../models/User.model.js';
import TransactionModel from '../models/Transaction.model.js';

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

export async function getUserPerformance(req, res) {
  try {
    const { id } = req.params;

    const userWithStat = await UserModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: 'affiliatestats',
          localField: '_id',
          foreignField: 'userId',
          as: 'affiliateStats',
        },
      },
      { $unwind: '$affiliateStats' },
    ]);

    const saleTransactions = await Promise.all(
      userWithStat[0].affiliateStats.affiliateSales.map((id) => {
        return TransactionModel.findById(id);
      })
    );

    const filteredSales = saleTransactions.filter((sale) => sale !== null);

    res.status(200).json({
      user: userWithStat[0],
      sales: filteredSales,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}
