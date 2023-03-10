import ProductModel from '../models/Product.model.js';
import ProductStatModel from '../models/ProductStat.model.js';
import UserModel from '../models/User.model.js';
import TransactionModel from '../models/Transaction.model.js';

import getCountryISO3 from '../utils/countryISO2toISO3.js';

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
    // sort request from FE: {"field": "userId", "sort": "asc" }
    const { page = 0, pageSize = 20, sort = null, search = '' } = req.query;

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
      .skip(pageSize * page)
      .sort(sortFormatted);

    const total = await TransactionModel.countDocuments({
      name: { $regex: search, $options: 'i' },
    });

    res.status(200).json({
      transactions,
      total,
    });
  } catch (error) {
    res.status(404).json({
      error,
    });
  }
}

export async function getGeography(req, res) {
  try {
    const users = await UserModel.find();

    const mappedCountries = users.reduce((acc, { country }) => {
      const countryISO3 = getCountryISO3(country);
      if (!acc[countryISO3]) {
        acc[countryISO3] = 0;
      }
      acc[countryISO3]++;

      return acc;
    }, {});

    // object that needed for nivo geography chart: { id: @country-name, value: @country-count }
    const formattedCountries = Object.entries(mappedCountries).map(
      ([country, count]) => {
        return {
          id: country,
          value: count,
        };
      }
    );

    res.status(200).json(formattedCountries);
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
}
