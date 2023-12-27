const Address = require('../models/addressModel');
const User = require('../models/userModel');
const { format } = require('date-fns');
const { StatusCodes } = require("http-status-codes");

const createAddress = async (req, res) => {
    const { userId, address } = req.body; // Assuming userId is provided in the request body
    const createDate = format(new Date(), 'MMM d, eee HH:mm:ss');
    const modifyDate = format(new Date(), 'MMM d, eee HH:mm:ss');
  
    try {
      const normalizedAddress = address.trim().toLowerCase();
      const existingAddresses = await Address.find();
  
      const matchingAddress = existingAddresses.find(existingAddress => {
        const normalizedExistingAddress = existingAddress.address.trim().toLowerCase();
        return normalizedExistingAddress === normalizedAddress;
      });
  
      if (matchingAddress) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          status: 'error',
          data: { message: 'Address with the same name already exists.' },
        });
      }
  
      const newAddress = new Address({
        address,
        createDate,
        modifyDate,
        user: userId, // Set the user field to the ID of the corresponding user
      });
  
      await newAddress.save();
      const user = await User.findById(userId);
        if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({
            status: 'error',
            data: { message: 'User not found.' },
        });
        }
        user.addresses.push(newAddress);
        await user.save();
      res.status(StatusCodes.CREATED).json({ status: 'success', data: newAddress });
    } catch (error) {
      console.error(error.stack);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: 'error',
        data: { message: 'Internal Server Error' },
      });
    }
};
const getAddressesByUserId = async (req, res) => {
    const userId = req.params.id;

  try {
    // Find the user by userId
    const user = await User.findById(userId).populate('addresses');

    // Check if the user exists
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 'error',
        data: { message: 'User not found.' },
      });
    }

    // Return the addresses associated with the user
    res.status(StatusCodes.CREATED).json({ status: 'success', data: user.addresses });
  } catch (error) {
    console.error(error.stack);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      data: { message: 'Internal Server Error' },
    });
  }
};
const updateAddressById = async (req, res) => {
    const addressId = req.params.id; // Get the ID of the address to update
    const updatedData = req.body; // Updated data

    try {
        const address = await Address.findById(addressId);

        if (!address) {
            return res.status(404).json({
                status: 'error',
                data: { message: 'Address not found.' },
            });
        }

        // Check for duplicates based on the new address name
        const normalizedAddressName = updatedData.address.trim().toLowerCase();
        const existingAddresses = await Address.find();

        const matchingAddress = existingAddresses.find((existingAddress) => {
            const existingNormalizedAddressName = existingAddress.address.trim().toLowerCase();
            return (
                existingNormalizedAddressName === normalizedAddressName && existingAddress._id !== addressId
            );
        });

        if (matchingAddress) {
            return res.status(400).json({
                status: 'error',
                data: { message: 'Address with the same name already exists.' },
            });
        }

        // Use the spread operator (...) to update all new properties from req.body
        Object.assign(address, updatedData);

        address.modifyDate = format(new Date(), 'MMM d, eee HH:mm:ss');
        await address.save();
        res.json({ status: 'success', data: address });
    } catch (error) {
        console.error(error.stack);
        res.status(500).json({
            status: 'error',
            data: { message: 'Internal Server Error' },
        });
    }
};
const deleteAddress = async (req, res) => {
    const addressId = req.params.id; // Extract the addressId from the request parameters

    try {
        // Find users with this address
        const usersWithAddress = await User.find({ addresses: addressId });

        // Remove the address from each user
        await Promise.all(usersWithAddress.map(async (user) => {
            user.addresses.pull(addressId);
            await user.save();
        }));

        // Delete the address
        const deletedAddress = await Address.findByIdAndRemove(addressId);

        if (!deletedAddress) {
            return res.status(404).json({
                status: 'error',
                data: { message: 'Address not found' },
            });
        }

        res.json({ status: 'success', data: { message: 'Address has been deleted' } });
    } catch (error) {
        console.error(error.stack);
        res.status(500).json({ status: 'error', data: { message: 'Internal Server Error' } });
    }
};
module.exports = {
    createAddress,
    getAddressesByUserId,
    updateAddressById,
    deleteAddress
  }