
import Stock from '../models/stock.model.js';

export const getStocks = async (req, res) => {
  try {
    const stocks = await Stock.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: stocks });
  } catch (error) {
    console.error('Error fetching stocks:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

export const addStockToWatchlist = async (req, res) => {
  try {
    const {
      company,
      description,
      initial_price,
      price_2002,
      price_2007,
      symbol,
    } = req.body;

    // Validate required fields
    if (!company || !initial_price || !symbol) {
      return res
        .status(400)
        .json({ success: false, error: 'Missing required fields' });
    }

    const stock = new Stock({
      company,
      description,
      initial_price,
      price_2002,
      price_2007,
      symbol,
    });

    await stock.save();
    res.status(201).json({
      success: true,
      message: 'Stock added to watchlist successfully',
      data: stock,
    });
  } catch (error) {
    console.error('Error adding stock:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};
