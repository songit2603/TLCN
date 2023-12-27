const express = require("express")
const router = express.Router()
const {
    getRevenue
  
  } = require("../controllers/revenueController")
const {
    authenticateUser,
    authorizePermissions,
  } = require("../middleware/authentication")
router.route("/").get(authenticateUser,getRevenue)
module.exports = router