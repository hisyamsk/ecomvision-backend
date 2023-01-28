import express from 'express';
import { getDashboardStats, getUser } from '../controller/general.controller.js';

const generalRouter = express.Router();

generalRouter.get('/', (req, res) => {
  res.json({
    message: 'hello',
  });
});

generalRouter.get('/user/:id', getUser);
generalRouter.get('/dashboard', getDashboardStats);

export default generalRouter;
