const express = require("express")
const router = express.Router()
const uploadI = require("../utils/upload")
const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
} = require("../controllers/productController")
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication")

const { getSingleProductReviews } = require("../controllers/reviewController")


router
  .route("/")
  //.post(uploadI.array("images"),createProduct)
  .post([authenticateUser, authorizePermissions("admin")], uploadI.array("images"),createProduct)
  .get(getAllProducts)

router
  .route("/uploadImage")
  //.post(uploadImage)
  .post([authenticateUser, authorizePermissions("admin")], uploadImage)

router
  .route("/:id")
  .get(getSingleProduct)
  .patch([authenticateUser, authorizePermissions("admin")],uploadI.array("images"),updateProduct)
  .delete([authenticateUser, authorizePermissions("admin")],deleteProduct)
  //.put([authenticateUser, authorizePermissions("admin")], uploadI.array("images", 4),updateProduct)
  //.delete([authenticateUser, authorizePermissions("admin")], deleteProduct)

router.route("/:id/reviews").get(getSingleProductReviews)

module.exports = router
