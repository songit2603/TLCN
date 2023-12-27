const Cart = require('../models/cartModel'); // Import model Giỏ hàng
const Product = require('../models/productModel'); // Import model Sản phẩm
const Color = require('../models/colorsModel'); // Import model Sản phẩm
const Variation = require('../models/variationModel'); // Import model Sản phẩm
const User = require('../models/userModel'); // Import model Sản phẩm
const { StatusCodes } = require("http-status-codes")
// Lấy giỏ hàng của người dùng
const getCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const cart = await Cart.findOne({ user: userId }).populate('items.product');

    if (!cart) {
      return res.status(StatusCodes.NOT_FOUND).json({ status: 'error', data: { message: 'Giỏ hàng không tồn tại' } });
    }

    res.status(StatusCodes.OK).json({ status: 'success', data: cart });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: 'error', data: { message: 'Lỗi server' } });
  }
};

// Thêm sản phẩm vào giỏ hàng
const addToCart = async (req, res) => {
    try {
      const { userId } = req.body;
      const { productId, colorId, variationId, quantity } = req.body;
  
      // Tìm sản phẩm dựa trên productId
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Sản phẩm không tồn tại' });
      }
      if (quantity > product.stock) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Số lượng tồn không đủ' });
      }
      // Tạo một mục mới cho giỏ hàng
      let price = 0;

    // Nếu có variation, tìm giá trị price dựa trên color và variation
    if (variationId) {
        const selectedColor = product.colors.find(v => v._id.toString() === colorId)
        const color = await Color.findById(selectedColor);
        if (color) {
            // Sử dụng một hàm lambda để tìm selectedVariation
            const selectedVariation = color.variations.find(v => v._id.toString() === variationId);
            const variation = await Variation.findById(selectedVariation);
            // Kiểm tra selectedVariation và cập nhật giá
            if (variation) {
                price = variation.price;
        }

        }
    }
    // Nếu không có variation, kiểm tra color
    else if (colorId && !variationId) {
      const selectedColor = product.colors.find(c => c._id.toString() === colorId);
      const color = await Color.findById(selectedColor);
        if (color) {
            price = color.price;
        }
    }

    // Nếu price vẫn bằng 0, thì sử dụng giá trị mặc định từ product
    if (!colorId && !variationId)  {
        price = product.newPrice;
    }

  
    // Tìm giỏ hàng của người dùng dựa trên userId
    let cart = await Cart.findOne({ user: userId });
  
    if (!cart) {
    cart = new Cart({
        user: userId,
        items: [],
        total: 0,
        });
    }
  
    // Kiểm tra xem mục giỏ hàng đã tồn tại chưa
    const cartItem = cart.items.find(item =>
      item.product.toString() === productId
    );
    if (cartItem) {
      if (cartItem.quantity + quantity > product.stock) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Số lượng tồn không đủ' });
      }
    // Mục giỏ hàng đã tồn tại, cập nhật số lượng
      cartItem.quantity += quantity;
      cartItem.price = price;
    } else {
    // Mục giỏ hàng chưa tồn tại, thêm mục mới
    cart.items.push({
        product: productId,
        color: colorId,
        variation: variationId,
        quantity,
        price,
        });
    }
  
      // Cập nhật tổng giá trị giỏ hàng
      cart.total = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
  
      // Lưu giỏ hàng
      await cart.save();
      await User.findByIdAndUpdate(
        userId,
        { $set: { cart: cart._id } }, // Assuming cart field in User model references the Cart model
        { new: true }
      );
  
      res.status(StatusCodes.OK).json({ status: 'success', data: cart });
    } catch (error) {
      console.error(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: 'error', data: { message: 'Lỗi server' } });
    }
  };
  

  // Cập nhật giỏ hàng (sửa số lượng hoặc xóa sản phẩm)
  const updateCart = async (req, res) => {
    try {
      const { userId, productId, quantity } = req.body;
  
      const cart = await Cart.findOne({ user: userId });
  
      if (!cart) {
        return res.status(404).json({ message: 'Giỏ hàng không tồn tại' });
      }
  
      const existingItemIndex = cart.items.findIndex(
        (cartItem) => cartItem.product.toString() === productId
      );
  
      if (existingItemIndex !== -1) {
        const product = await Product.findById(productId);
        if (quantity > product.stock) {
          return res.status(400).json({ message: 'Số lượng cần cập nhật vượt quá số lượng tồn' });
        }
        // Update the quantity of the specified product
        cart.items[existingItemIndex].quantity = quantity;
      } else {
        return res.status(404).json({ message: 'Sản phẩm không tồn tại trong giỏ hàng' });
      }
  
      // Tính toán lại tổng giá trị giỏ hàng
      cart.total = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
  
      // Lưu giỏ hàng sau khi cập nhật
      await cart.save();
  
      res.status(StatusCodes.OK).json({ status: 'success', data: cart });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: 'error', data: { message: 'Lỗi server' } });
    }
  };
  // Xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = async (req, res) => {
    try {
      const { userId, productId } = req.body;
  
      const cart = await Cart.findOne({ user: userId });
  
      if (!cart) {
        return res.status(404).json({ message: 'Giỏ hàng không tồn tại' });
      }
  
      const existingItemIndex = cart.items.findIndex(
        (cartItem) => cartItem.product.toString() === productId
      );
  
      if (existingItemIndex === -1) {
        return res.status(404).json({ message: 'Sản phẩm không tồn tại trong giỏ hàng' });
      }
  
      // Xóa sản phẩm khỏi giỏ hàng
      cart.items.splice(existingItemIndex, 1);
  
      // Tính toán lại tổng giá trị giỏ hàng
      cart.total = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
  
      // Lưu giỏ hàng sau khi xóa sản phẩm
      await cart.save();
  
      res.status(StatusCodes.OK).json({ status: 'success', data: cart });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: 'error', data: { message: 'Lỗi server' } });
  }
  };

module.exports = {
    getCart,
    addToCart,
    updateCart,
    removeFromCart
  }
