import express from 'express';
import {
  getAllProducts,
  getAllCustomers,
} from '../controller/client.controller.js';

const clientRouter = express.Router();

clientRouter.get('/products', getAllProducts);
clientRouter.get('/customers', getAllCustomers);

export default clientRouter;
