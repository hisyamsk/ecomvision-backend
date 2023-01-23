import ProductModel from '../models/Product.model.js';
import ProductStatModel from '../models/ProductStat.model.js';
import UserModel from '../models/User.model.js';
import TransactionModel from '../models/Transaction.model.js';

export async function getAllProducts(req, res) {
  try {
    const products = await ProductModel.find();

    const productsWithStats = await Promise.all(
      products.map(async (product) => {
        const stat = await ProductStatModel.find({
          productId: product._id,
        });

        return {
          ...product._doc,
          stat,
        };
      })
    );
    res.status(200).json(productsWithStats);
  } catch (error) {
    res.status(404).json({
      error,
    });
  }
}

export async function getAllCustomers(req, res) {
  try {
    const customers = await UserModel.find({ role: 'user' }).select(
      '-password'
    );
    res.status(200).json(customers);
  } catch (error) {
    res.status(404).json({
      error,
    });
  }
}

export async function getAllTransactions(req, res) {
  try {

    // sort request from RE: {"field": "userId", "sort": "asc" }
    const { page = 1, pageSize = 20, sort = null, search = ' ' } = req.query;

    const formattedSort = () => {
      const parsedSort = Boolean(sort) && JSON.parse(sort);
      const sortFormatted = {
        [parsedSort.field]: parsedSort.sort === 'asc' ? 1 : -1,
      };
      return sortFormatted;
    };

    const sortFormatted = Boolean(sort) ? formattedSort() : {};

    const transactions = await TransactionModel.find({
      $or: [
        { cost: { $regex: new RegExp(search, 'i') } },
        { userId: { $regex: new RegExp(search, 'i') } },
      ],
    })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort(sortFormatted);

    const total = await TransactionModel.countDocuments({
      name: { $regex: search, $options: 'i' },
    });

    res.status(200).json({
      transactions,
      total,
    });
  } catch (error) {
    res.statsu(404).json({
      error,
    });
  }
}
