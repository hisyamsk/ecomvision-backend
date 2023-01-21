import ProductModel from '../models/Product.model.js';
import ProductStatModel from '../models/ProductStat.model.js';

export async function getAllProducts(req, res) {
  try {
    const products = await ProductModel.find().limit(20);

    const productsWithStats = await Promise.all(
      products.map(async (product) => {
        const stat = await ProductStatModel.find({
          productId: product._id,
        })

        return {
          ...product._doc,
          stat,
        }
      })
    )
    res.status(200).json(productsWithStats);
  } catch (error) {
    res.status(404).json({
      error,
    });
  }
}
