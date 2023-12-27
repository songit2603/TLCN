const express = require("express")
const router = express.Router()
const uploadI = require("../utils/upload")
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication")

const {
  getCartandOrderByAccount,
  getAllAccounts,
  getSingleAccount,
  showCurrentUser,
  updateAccount,
  updateUserPassword,
  deleteAccount
} = require("../controllers/userController")
router
  .route("/")
  .get(authenticateUser, authorizePermissions("admin", "owner"), getAllAccounts)
router.route("/showMe").get(authenticateUser, showCurrentUser)
// router.route("/updateUser").patch(authenticateUser, uploadI.single("image"),updateUser)
router.route("/updateUserPassword").patch(authenticateUser, updateUserPassword)
router.route("/:id").get(authenticateUser, getCartandOrderByAccount).patch(authenticateUser,authorizePermissions("admin", "user"), uploadI.single("image"),updateAccount).delete(authenticateUser, authorizePermissions("admin"),deleteAccount)
module.exports = router
