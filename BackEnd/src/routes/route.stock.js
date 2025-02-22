import express from 'express';
import { getStocks, addStockToWatchlist } from '../controllers/stockController.js';


const router = express.Router();

router.get('/stocks', getStocks);
router.post('/stocks', addStockToWatchlist);

export default router;
