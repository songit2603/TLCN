const express = require("express")
const router = express.Router()
const {
  getCart,
  addToCart,
  updateCart,
  removeFromCart,

} = require("../controllers/cartController")
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication")



router.route("/")
  .post(authenticateUser,addToCart)
  .get(getCart)
  .patch(authenticateUser,updateCart)
  .delete(authenticateUser,removeFromCart)
router.route("/:id")


module.exports = router
