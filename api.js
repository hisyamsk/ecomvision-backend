import express from 'express';

import generalRouter from './routes/general.router.js';
import clientRouter from './routes/client.router.js';
import managementRouter from './routes/management.router.js';
import salesRouter from './routes/sales.router.js';

const api = express.Router();

api.use('/general', generalRouter);
api.use('/client', clientRouter);
api.use('/management', managementRouter);
api.use('/sales', salesRouter);

export default api;
