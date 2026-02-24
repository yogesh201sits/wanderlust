const express = require("express");
const router = express.Router();
const user = require("../model/user.js");
const WrapAsync = require("../utils/WrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");


const userController = require("../controllers/user.js")

router.route("/signup")
    .get(userController.renderSignUpForm)
    .post(WrapAsync(userController.createUser));

router.route("/login")
    .get(userController.renderLoginForm)
    .post(saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),userController.loginUser
);

 
router.get("/logout",userController.logOutUser)


module.exports=router;