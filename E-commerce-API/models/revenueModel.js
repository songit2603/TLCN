const mongoose = require('mongoose');

const revenueSchema = new mongoose.Schema({
  totalRevenue: { type: Number, required: true },
  totalOrders: { type: Number, required: true },
  totalUsers: { type: Number, required: true },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Account' }],
  topSellingProducts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  recentOrders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  timestamp: { type: String },
});

const Revenue = mongoose.model('Revenue', revenueSchema);

module.exports = Revenue;