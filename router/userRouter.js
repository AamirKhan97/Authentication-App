const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../model/UserModel");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const bycrypt = require("bcryptjs");
const authenticate = require("../middlewares/authenticate");

/*
    1) Registration Of User
    URL : /user/register,
    FIELDS : name, email, password
    METHOD : POST,
    ACCESS : PUBLIC
*/

router.post(
  "/register",
  [
    check("name").notEmpty().withMessage("User Name Is Required"),
    check("email").isEmail().withMessage("Enter a Proper Email"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Enter a proper password"),
  ],
  async (request, response) => {
    let errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(401).json({ errors: errors.array() });
    }
    try {
      // Read the form data
      let { name, email, password } = request.body;
      // Check weather user exist or not
      let user = await User.findOne({ email: email });
      if (user) {
        return response
          .status(401)
          .json({ errors: [{ msg: "User Already Exist" }] });
      }
      // Hash passw ord with bycrypt password
      let salt = await bycrypt.genSalt(10);
      password = await bycrypt.hash(password, salt);

      // gravatar image
      let avatar = await gravatar.url(email, {
        s: "200",
        r: "G",
        d: "mm",
      });

      // Insert into database
      user = new User({ name, email, password, avatar });
      user = await user.save();

      response.status(200).json({
        msg: "Success",
        user: user,
      });
    } catch (error) {
      // console.log('>>>>> Registration=>>> Error', error)
      response.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
  }
);

/*
    2) Login Of User
    URL : /user/login,
    FIELDS :  email, password,
    METHOD : POST, 
    ACCESS : PUBLIC
*/
router.post(
  "/login",
  [
    check("email").isEmail().withMessage("Enter a Proper Email"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Enter a proper password"),
  ],
  async (request, response) => {
    // Get Details Of User Logic
    let errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(401).json({ errors: errors.array() });
    }
    try {
      let { email, password } = request.body;
      //  Check user exist or not
      let user = await User.findOne({ email: email });
      if (!user) {
        return response
          .status(401)
          .json({ errors: [{ msg: "No user Found, Please REGISTER" }] });
      }
      let oldPassword = await bycrypt.compare(password, user.password);
      if (!oldPassword) {
        return response
          .status(401)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      // create a token
      let payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, process.env.JWT_SECREAT_KEY, (error, token) => {
        if (error) throw error;
        response.status(200).json({
          token: token,
          user : user
        });
      });
    } catch (error) {
      console.log(">>>>> Registration=>>> Error", error);
      response.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
  }
);

/*
    3) Get Details Of User
    URL : /user
    FIELDS :  empty
    METHOD : GET,
    ACCESS : PRIVATE
*/
router.get("/me", authenticate, async (request, response) => {
  // get al user logic
  try {
    let user = await User.findById(request.user.id).select("-password");
    response.status(200).json(user);
  } catch (error) {
    console.log("Get User Info clg=>>", error);
    response.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});


module.exports = router;
