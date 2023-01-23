import UserModel from '../models/User.model.js';

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
