import mongoose from 'mongoose';

const stockSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    initial_price: {
      type: Number,
      required: true,
      min: 0,
    },
    price_2002: {
      type: Number,
      required: true,
      min: 0,
    },
    price_2007: {
      type: String,
      min: 0,
    },
    symbol: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.export = mongoose.model('Stock', stockSchema);
