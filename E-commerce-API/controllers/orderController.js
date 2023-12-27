const Order = require('../models/orderModel');
const Cart = require('../models/cartModel');
const { StatusCodes } = require("http-status-codes");
const { format } = require('date-fns');  // Import the 'format' function from 'date-fns'
const Product = require('../models/productModel')
const User = require('../models/userModel')
// Controller to get all order
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user').populate('items.product');

    if (orders.length === 0) {
      return res.status(404).json({ status: 'error', data: { message: 'No orders found' } });
    }

    res.status(200).json({ status: 'success', data: orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ status: 'error', data: { message: 'Internal Server Error' } });
  }
};


// Controller to create a new order
const createOrder = async (req, res) => {
  const createDate = format(new Date(), 'MMM d, eee HH:mm:ss');
  const modifyDate = format(new Date(), 'MMM d, eee HH:mm:ss');
  try {
    const { userId, name, items, phoneNumber, email, voucher, totalItem, taxFee, shippingCost, shippingAddress, paymentMethod, total } = req.body;

    let newOrder;

    if (!userId) {
      for (const orderItem of items) {
        const product = await Product.findById(orderItem.product);

        // Kiểm tra xem số lượng đặt hàng có lớn hơn số lượng tồn không
        if (orderItem.quantity > product.stock) {
          return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Số lượng tồn không đủ' });
        }
      }
      newOrder = new Order({
        name,
        items: items.map(orderItem => ({
          product: orderItem.product,
          quantity: orderItem.quantity,
          price: orderItem.price // Lưu giá của sản phẩm tại thời điểm tạo đơn hàng
        })),
        phoneNumber,
        email,
        total,
        totalItem,
        taxFee,
        shippingCost,
        voucher,
        shippingAddress,
        paymentMethod,
        createDate,
        modifyDate
      });
    } else {
      for (const orderItem of items) {
        const product = await Product.findById(orderItem.product);

        // Kiểm tra xem số lượng đặt hàng có lớn hơn số lượng tồn không
        if (orderItem.quantity > product.stock) {
          return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Số lượng tồn không đủ' });
        }
      }
      newOrder = new Order({
        user: userId,
        items: items.map(orderItem => ({
          product: orderItem.product,
          quantity: orderItem.quantity,
          price: orderItem.price // Lưu giá của sản phẩm tại thời điểm tạo đơn hàng
        })),
        phoneNumber,
        total,
        totalItem,
        taxFee,
        shippingCost,
        voucher,
        email,
        shippingAddress,
        paymentMethod,
        createDate,
        modifyDate
      });
    }

    const userCart = await Cart.findOneAndUpdate(
      { user: userId },
      { $set: { items: [], total: 0 } },
      { new: true }
    );
    
    if (!userCart) {
      console.log('Không tìm thấy giỏ hàng để xóa.');
    }
    const order = await newOrder.save();

    // Iterate through each item in the order and update the corresponding product
    for (const orderItem of order.items) {
      const product = await Product.findById(orderItem.product);

      if (product) {
        product.orders.push(order);
        product.ordersCount += 1;
        product.stock -= orderItem.quantity;
        await product.save();
      }
    }
    if (userId) {
      const updateUser = await User.findByIdAndUpdate(
        userId,
        { $push: { orders: order._id } }, // Assuming "orders" is the field in the User model that references orders
        { new: true }
      );

      if (!updateUser) {
        return res.status(500).json({ status: 'error', data: { message: 'Failed to update user with the order' } });
      }
    }

    res.status(201).json({ status: 'success', data: order});
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ status: 'error', data: { message: 'Internal Server Error' } });
  }
};



// Controller to get a specific order by ID
const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId).populate('user').populate('items.product');

    if (!order) {
      return res.status(404).json({ status: 'error', data: { message: 'Order not found' } });
    }

    res.status(200).json({ status: 'success', data: order});
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ status: 'error', data: { message: 'Internal Server Error' } });
  }
};
const getCurrentUserOrders = async (req, res) => {
  try {
    // Assuming you have a way to identify the current user, such as from the authentication middleware
    const userId = req.params.id;

    const userOrders = await Order.find({ user: userId }).populate('items.product');

    res.json(userOrders);
  } catch (error) {
    console.error('Error fetching current user order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller to update an existing order
const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { phoneNumber, email, voucher, totalItem, taxFee, shippingCost, shippingAddress, paymentMethod, total, status } = req.body;

    // Use ISO format for the modified date
    const modifyDate = format(new Date(), 'MMM d, eee HH:mm:ss');

    // Check if the order exists
    const existingOrder = await Order.findById(orderId);

    if (!existingOrder) {
      return res.status(404).json({ status: 'error', data: { message: 'Order not found' } });
    }
    if (existingOrder.status === 'Cancelled' || existingOrder.status === 'Returns') {
      return res.status(400).json({ status: 'error', data: { message: 'Cannot modify a cancelled order' } });
    }
    if (status === 'Cancelled' && existingOrder.status !== 'Pending') {
      return res.status(400).json({ status: 'error', data: { message: 'Cannot cancel an order that is not in "Pending" status' } });
    }
    // Create an object with fields to update
    const updateFields = {
      phoneNumber,
      email,
      voucher,
      totalItem,
      taxFee,
      shippingCost,
      shippingAddress,
      paymentMethod,
      total,
      status,
      modifyDate
    };
    // Update the order without userId and name
    const updatedOrder = await Order.findByIdAndUpdate(orderId, updateFields, { new: true }).populate('items.product user');;
    if (status === 'Cancelled' && existingOrder.status !== 'Cancelled' || status === 'Returns' && existingOrder.status !== 'Returns') {
      // Handle order cancellation logic here

      // Refund product quantities
      for (const item of existingOrder.items) {
        const product = await Product.findById(item.product);
        if (product) {
          // Refund the quantity for each product
          product.stock += item.quantity;
          product.orders.pull(orderId);
          product.ordersCount -= 1;
          await product.save();
        }
      }
    }
    // Fetch the updated order with populated items
    // Note: If needed, you can populate specific fields here
    res.status(200).json({ status: 'success', data: updatedOrder });
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ status: 'error', data: { message: 'Internal Server Error' } });
  }
};



const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;

    // Check if the order exists
    const existingOrder = await Order.findById(orderId);

    if (!existingOrder) {
      return res.status(StatusCodes.NOT_FOUND).json({ status: 'error', data: { message: 'Order not found' } });
    }
    if (existingOrder.status !== 'Cancelled') {
      return res.status(StatusCodes.BAD_REQUEST).json({ status: 'error', data: { message: 'Only orders with status "Cancelled" can be deleted' } });
    }

    // Iterate through each item in the order and update the corresponding product
    // for (const orderItem of existingOrder.items) {
    //   const product = await Product.findById(orderItem.product);

    //   if (product) {
    //     // Remove the association with the order from the product
    //     product.orders.pull(orderId);
    //     product.ordersCount -= 1;
    //     await product.save();
    //   }
    // }

    // Check if the order has an associated user
    if (existingOrder.user) {
      // Remove the associated order from the user's orders array
      const updateUser = await User.findByIdAndUpdate(
        existingOrder.user,
        { $pull: { orders: orderId } },
        { new: true }
      );

      if (!updateUser) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: 'error', data: { message: 'Failed to update user' } });
      }
    }

    // Delete the order
    await existingOrder.remove();

    res.status(StatusCodes.OK).json({ status: 'success', data: { message: 'Delete order success' } });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: 'error', data: { message: 'Internal Server Error' } });
  }
};
module.exports = {
  getAllOrders,
  createOrder,
  getOrderById,
  getCurrentUserOrders,
  updateOrder,
  deleteOrder, 
  // Add other exported controllers here
};
