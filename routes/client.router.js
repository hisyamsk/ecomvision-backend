import express from 'express';
import {
  getAllProducts,
  getAllCustomers,
  getAllTransactions,
} from '../controller/client.controller.js';

const clientRouter = express.Router();

clientRouter.get('/products', getAllProducts);
clientRouter.get('/customers', getAllCustomers);
clientRouter.get('/transactions', getAllTransactions);

export default clientRouter;
