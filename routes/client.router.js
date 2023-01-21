import express from 'express';
import { getAllProducts } from '../controller/client.controller.js';

const clientRouter = express.Router();

clientRouter.get('/', getAllProducts);

export default clientRouter;
