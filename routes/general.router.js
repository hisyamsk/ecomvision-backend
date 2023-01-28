import express from 'express';
import {
  getDashboardStats,
  getUser,
} from '../controller/general.controller.js';

const generalRouter = express.Router();

generalRouter.get('/healthcheck', (req, res) => {
  res.sendStatus(200);
});

generalRouter.get('/user/:id', getUser);
generalRouter.get('/dashboard', getDashboardStats);

export default generalRouter;
