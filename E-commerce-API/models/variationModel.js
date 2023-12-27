const mongoose = require("mongoose");

const VariationSchema = new mongoose.Schema({
  size: {
    type: String,
    required: [true, "Please provide size"],
    trim: true,
    maxlength: [50, "Size cannot be more than 50 characters"],
  },
  price: {
    type: Number,
    required: [true, "Please provide price"],
  },
  // Thêm các thuộc tính khác cho biến thể (nếu cần).
});

module.exports = mongoose.model("Variation", VariationSchema);