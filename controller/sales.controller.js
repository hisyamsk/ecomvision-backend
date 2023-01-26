import OverallStatModel from '../models/OverallStat.model.js';

export async function getSales(req, res) {
  try {
    const overallStat = await OverallStatModel.find()
    res.status(200).json(overallStat)
  } catch (error) {
    res.status(404).json(error);
  }
}
