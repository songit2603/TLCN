const mongoose = require("mongoose");

const ColorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide color name"],
    trim: true,
    maxlength: [100, "Name cannot be more than 100 characters"],
  },
  price: {
    type: Number,
    default: null,
  },
  variations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Variation", // Liên kết với mô hình Variation
    },
  ],
  // Thêm các thuộc tính khác cho màu sắc (nếu cần).
});

module.exports = mongoose.model("Color", ColorSchema);