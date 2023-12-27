const User = require("../models/userModel")
const Cart = require("../models/cartModel")
const { StatusCodes } = require("http-status-codes")
const CustomError = require("../errors")
const path = require('path');
const fs = require('fs');
const { format } = require("date-fns");
const {
  createTokenUser,
  attachCookiesToResponse,
  checkPermissions,
} = require("../utils")
//** ======================== GetCartandOrderByUser ========================
const getCartandOrderByAccount = async (req, res) => {
  try {
    const userId = req.params.id;

    // Find the user by ID and populate the "cart" field
    const user = await User.findById(userId)
    .populate({
      path: "cart",
      select: "_id items total",
      populate: {
        path: "items.product",// Đặt path tới trường chứa ID của sản phẩm trong items
      }
    }).populate({
      path: "orders",
      select: "_id items user total totalItem voucher taxFee shippingAddress shippingCost phoneNumber email paymentMethod status createDate modifyDate", populate: {
        path: "user items.product", // Đặt path tới trường chứa ID của sản phẩm trong items
      }
    }).populate({
      path: "addresses",
      select: "address"
    });

    if (!user) {
      return res.status(404).json({ status: 'error', data: { message: 'User not found' } });
    }

    // Return user information with a "status" of "success"
    res.status(200).json({ status: 'success', data: user  });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', data: { message: 'Internal server error' } });
  }
};
//** ======================== Get all users ========================
const getAllAccounts = async (req, res) => {
  try {
    const data = await User.find().select("-password");
    res.status(StatusCodes.OK).json({ status: "success", data});
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', data: { message: 'Internal server error' } });
  }
};

//** ======================== Get single user ========================
const getSingleAccount = async (req, res) => {
  const { id: userId } = req.params
  const user = await User.findOne({ _id: userId }).select("-password")
  if (!user) {
    throw CustomError.NotFoundError("User does not exist")
  }
  checkPermissions(req.user, user._id)
  res.status(StatusCodes.OK).json({ user })
}

//** ======================== Show current user ========================
const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user })
}
//** ======================== DeleteOldImage========================
const deleteOldImage = async (oldImage) => {
  if (oldImage && oldImage.url) {
    const imagePath = oldImage.url.replace('http://localhost:5000/', ''); // Extract the local path from the URL

    try {
      // Delete the old image file
      await fs.unlink(imagePath);
      console.log(`Old image deleted: ${imagePath}`);
    } catch (error) {
      console.error(`Error deleting old image: ${error.message}`);
    }
  }
};
//** ======================== Update user ========================
const updateAccount = async (req, res) => {
  try {
    const image = req.file;
    const updatedData = req.body; // Updated data
    const userId = req.params.id

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ status: 'error', data: { message: 'User not found' } });
    }
    if (updatedData.email && updatedData.email !== user.email) {
      const existingUserWithSameEmail = await User.findOne({ email: updatedData.email });

      if (existingUserWithSameEmail) {
        return res.status(400).json({
          status: 'error',
          data: { message: 'Email already exists. Please choose a different one.' },
        });
      }
    }
    // If there's a new image, delete the old one and update the user's avatar
    if (image) {
      await deleteOldImage(user.avatar); // Delete old image
      const newImagePath = `public/uploads/${path.basename(image.path)}`;
      const imageData = { url: `http://localhost:5000/${newImagePath}` };
      user.avatar = imageData;
    }

    // Update other user data
    Object.assign(user, updatedData);
    user.modifyDate = format(new Date(), "MMM d, eee HH:mm:ss");
    await user.save();

    // Create a new token with the updated user data
    const tokenUser = createTokenUser(user);

    // Attach cookies to the response
    attachCookiesToResponse({ res, user: tokenUser });

    // Respond with the updated user
    res.status(StatusCodes.OK).json({ status: 'success', data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', data: { message: 'Internal server error' } });
  }
};

//** ======================== Update user password ========================
const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body
  if (!oldPassword || !newPassword) {
    throw new CustomError.BadRequestError("Please provide both values")
  }
  const user = await User.findOne({ _id: req.user.userId })
  const isPasswordCorrect = await user.comparePassword(oldPassword)
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Wrong password provided")
  }
  user.password = newPassword
  await user.save()
  res.status(StatusCodes.OK).json({ msg: "Success! Password Updated" })

}
// const updateUserStatus = async (req, res) => {
//   try {
//     const image = req.file;
//     const updatedData = req.body; // Updated data
//     const userId = req.params.id; // Assuming you pass the user ID to update through the URL

//     // Find the user by ID
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ status: 'error', data: { message: 'User not found' } });
//     }
//     if (updatedData.email && updatedData.email !== user.email) {
//       const existingUserWithSameEmail = await User.findOne({ email: updatedData.email });

//       if (existingUserWithSameEmail) {
//         return res.status(400).json({
//           status: 'error',
//           data: { message: 'Email already exists. Please choose a different one.' },
//         });
//       }
//     }
//     if (image) {
//       await deleteOldImage(user.avatar); // Delete old image
//       const newImagePath = `public/uploads/${path.basename(image.path)}`;
//       const imageData = { url: `http://localhost:5000/${newImagePath}` };
//       user.avatar = imageData;
//     }

//     // Update user status and other data
//     Object.assign(user, updatedData);

//     // Save the updated user
//     await user.save();

//     // Respond with the updated user
//     res.status(StatusCodes.OK).json({ status: 'success', data: { user } });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ status: 'error', data: { message: 'Internal server error' } });
//   }
// };
const deleteAccount = async (req, res) => {
  try {
    const userIdToDelete = req.params.id;

    // Find the user by ID
    const user = await User.findById(userIdToDelete);

    if (!user) {
      return res.status(404).json({ status: 'error', data: { message: 'User not found' } });
    }

    // Find and delete the associated cart
    await Cart.deleteOne({ userId: userIdToDelete });

    // Perform any additional logic before deletion (if needed)
    // ...

    // Delete the user
    await user.remove();

    res.status(StatusCodes.OK).json({ status: 'success', data: { message: 'User and associated cart deleted successfully' } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', data: { message: 'Internal server error' } });
  }
}

module.exports = {
  getCartandOrderByAccount,
  getAllAccounts,
  getSingleAccount,
  showCurrentUser,
  updateAccount,
  updateUserPassword,
  deleteAccount
}
