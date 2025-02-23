import express from 'express';
import {
  getStocks,
  addStockToWatchlist,
} from '../controllers/stockController.js';

const stockRouter = express.Router();
stockRouter.get('/', getStocks);
stockRouter.post('/', addStockToWatchlist);

export default stockRouter;
