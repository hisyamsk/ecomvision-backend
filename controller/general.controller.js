import UserModel from '../models/User.model.js';
import OverallStatModel from '../models/OverallStat.model.js';
import TransactionModel from '../models/Transaction.model.js';

export async function getUser(req, res) {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({
      error,
    });
  }
}

export async function getDashboardStats(req, res) {
  try {
    // hardcoded values
    const currentMonth = 'November';
    const currentYear = 2021;
    const currentDay = '2021-11-15';

    // Recent transactions
    const transactions = await TransactionModel.find()
      .limit(50)
      .sort({ createdOn: -1 });

    // Overall stats
    const overallStat = await OverallStatModel.find({ year: currentYear });

    const {
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
    } = overallStat[0];

    const thisMonthStat = overallStat[0].monthlyData.find(({ month }) => {
      return month === currentMonth;
    });

    const todayStat = overallStat[0].dailyData.find(({ date }) => {
      return date === currentDay;
    });

    res.sendStatus(200).json({
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
      thisMonthStat,
      todayStat,
      transactions,
    });

  } catch (error) {
    res.status(404).json({
      error,
    });
  }
}
