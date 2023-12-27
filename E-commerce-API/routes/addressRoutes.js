const express = require("express")
const router = express.Router()
const {
    createAddress,
    getAddressesByUserId,
    updateAddressById,
    deleteAddress
  } = require("../controllers/addressController")
const {
    authenticateUser,
    authorizePermissions,
  } = require("../middleware/authentication")

router
  .route("/")
  //.post(createCategory)
  .post(authenticateUser,createAddress)

router
  .route("/:id")  
  .get(authenticateUser, getAddressesByUserId)
  .patch(authenticateUser, updateAddressById)
  .delete(authenticateUser, deleteAddress)
  module.exports = router