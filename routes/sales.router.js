import express from 'express';
import { getSales } from '../controller/sales.controller.js';

const salesRouter = express.Router();

salesRouter.get('/sales', getSales)

export default salesRouter;
