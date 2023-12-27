const mongoose = require("mongoose")

const imageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
});

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide product name"],
      trim: true,
      maxlength: [500, "Name cannot be more than 120 characters"],
    },
    name_slug: {
      type: String,
      trim: true,
      maxlength: [500, "Name cannot be more than 100 characters"],
    },
    stock: {
      type: Number,
      required: [true, "Please provide stock value"],
      default: 0,
    },
    price: {
      type: String,
      required: [false, "Please provide price value"],
      default: null,
    },
    minPrice: {
      type: String,
      default: null,
    },
    maxPrice: {
      type: String,
      default: null,
    },
    newPrice: {
      type: String,
      default: null,
    },
    specification: {
      type: String,
      maxlength: [3000, "Description can not be more than 3000 characters"],
    },
    description: {
      type: String,
      maxlength: [3000, "Description can not be more than 3000 characters"],
    },
    linkrv: {
      type: String,
      maxlength: [1000, "Description can not be more than 1000 characters"],
    },
    images: [imageSchema],
    discount: {
      type: Number,
      default: 0, // Giá trị mặc định cho discount
    },
    publishedDate: {
      type: String,
    },
    updatedAt: {
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please category"],
      ref: 'Category',
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please brand"],
      ref: 'Brand',
    },
    // user: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "User",
    // },
    colors: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Color",
    }],
    isPublish: {
      type: Boolean,
      default: false, 
    },
    orders: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    }],
    ordersCount: {
      type: Number,
      default: 0,
    },
  
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
)

// If I want to search single product, in tha product I also want to have all reviews associated with that product.
ProductSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "product",
  justOne: false,
  // match: {rating: 5} // Get the reviews whose rating is only 5.
})
ProductSchema.virtual("ordersCountVirtual").get(function () {
  return this.orders.length;
});

ProductSchema.pre("remove", async function (next) {
  // Go to 'Reveiw; and delete all the review that are associated with this particular product
  await this.model("Review").deleteMany({ product: this._id })
})

module.exports = new mongoose.model("Product", ProductSchema)
