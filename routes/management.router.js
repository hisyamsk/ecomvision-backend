import express from 'express';
import {
  getAdmins,
  getUserPerformance,
} from '../controller/management.controller.js';

const managementRouter = express.Router();

managementRouter.get('/admins', getAdmins);
managementRouter.get('/performance/:id', getUserPerformance);

export default managementRouter;
