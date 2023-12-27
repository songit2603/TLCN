const { StatusCodes } = require("http-status-codes")
const Order  = require('../models/orderModel')
const Revenue = require('../models/revenueModel');
const User = require('../models/userModel');
const Product = require('../models/productModel');
const { format } = require("date-fns");
const getRevenue = async (req, res) => {
  try {
    // Lấy bản ghi doanh thu hiện tại từ cơ sở dữ liệu (giả sử chỉ có một bản ghi duy nhất)
    let existingRevenueRecord = await Revenue.findOne();

    // Nếu không có bản ghi nào, tạo một bản ghi mới
    if (!existingRevenueRecord) {
      existingRevenueRecord = new Revenue();
    }

    // Lấy tất cả các đơn hàng có trạng thái 'success'
    const successOrders = await Order.find({ status: 'Delivered' });

    // Tính toán tổng doanh thu, số lượng đặt hàng, khách hàng và lợi nhuận
    const totalRevenue = successOrders.reduce((total, order) => total + order.total, 0);
    const totalOrders = successOrders.length;

    // Cập nhật thông tin doanh thu
    existingRevenueRecord.totalRevenue = totalRevenue;
    existingRevenueRecord.totalOrders = totalOrders;
    // Lấy thông tin về tất cả người dùng có vai trò "user"
    const allUsers = await User.find({ role: 'user' }).select('-password');

    // Lấy số lượng người dùng và cập nhật thông tin vào bản ghi doanh thu
    existingRevenueRecord.totalUsers = allUsers.length;
    existingRevenueRecord.users = allUsers.map(user => user._id);
    const topSellingProducts = await Order.aggregate([
      {
        $match: { status: 'Delivered' }
      },
      {
        $unwind: '$items'
      },
      {
        $group: {
          _id: '$items.product',
          totalQuantity: { $sum: '$items.quantity' }
        }
      },
      {
        $sort: { totalQuantity: -1 }
      },
      {
        $limit: 5
      }
    ]);
    const topSellingProductIds = topSellingProducts.map(product => product._id);
    const topSellingProductsDetails = await Product.find({ _id: { $in: topSellingProductIds } });
    existingRevenueRecord.topSellingProducts = topSellingProductsDetails;
    // Lấy sản phẩm bán chạy (ví dụ: 5 sản phẩm bán chạy nhất)
    const recentOrders = await Order.find({})
    .sort({ createDate: -1 })
    .limit(5)
    .populate('user').populate('items.product')
    // Cập nhật thông tin sản phẩm bán chạy

    // Cập nhật thông tin đơn hàng gần đây
    existingRevenueRecord.recentOrders = recentOrders;
    existingRevenueRecord.timestamp = format(new Date(), "MMM d, eee HH:mm:ss");
    // Lưu trữ hoặc cập nhật bản ghi doanh thu vào cơ sở dữ liệu
    await existingRevenueRecord.save();


    // Trả về kết quả giống như hàm getSingleCategory
    res.status(StatusCodes.OK).json({
      status: 'success',
      data: existingRevenueRecord
      ,
    });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: 'error', data: { message: 'Internal Server Error' } });
  }
};

module.exports = {
  getRevenue
};
