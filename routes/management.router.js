import express from 'express';
import { getAdmins } from '../controller/management.controller.js';

const managementRouter = express.Router();

managementRouter.get('/admins', getAdmins)

export default managementRouter;
