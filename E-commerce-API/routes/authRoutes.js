const express = require("express")
const router = express.Router()

const { register, login, logout } = require("../controllers/authController")

router.route("/signup").post(register)
router.route("/signin").post(login)
router.route("/logout").get(logout)

module.exports = router
