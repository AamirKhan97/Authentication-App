const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const authenticate = require("../middlewares/authenticate");
const AllUsers = require("../model/CreateUser.js");

// Create a user
  router.post(
    "/upload", authenticate,
    async (request, response) => {
      // For Upload logi
      try {
        let newUser = {
          name: request.body.name,
          email: request.body.email,
          avatar: request.body.avatar,
          contact: request.body.contact,
          password: request.body.password,
        };
        let details = new AllUsers(newUser);
        details = await details.save();
        response.status(200).json({
          Result: "Success",
          details: details,
        });
      } catch (error) {
        console.log(error);
      }
    }
  );

// get single user
  router.get("/user/:id",authenticate, async (request, response) => {
    try {
      let productId = request.params.id;
      let singleUser = await AllUsers.findById(productId);
      response.status(200).json(singleUser);
    } catch (error) {
      response.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
  });

  // Edit a user
  router.put("/edit/:id", authenticate, async (request, response) => {
    try {
        let userId = request.params.id;
        let updateUser =  {
          name  : request.body.name,
          email : request.body.image,
          avatar : request.body.price,
          contact : request.body.qty,
          password : request.body.info
        };
        
        let user = await AllUsers.findById(userId);
        if(!user) {
          return response.status(401).json({
               msg : 'No such User Found'
           });
        }
        user = await AllUsers.findByIdAndUpdate(user, {
          $set : updateUser
      },{new : true});
      response.status(200).json({
          msg : 'updated success',
          user : user
      })
      }
      catch (error) {
        response.status(500).json({ errors: [{ msg: "Server Error" }] });
      }
    });
    
    // Get all users
  router.get("/all", authenticate, async (req, res) => {
  try {
    let allUser = await AllUsers.find();
    res.status(200).json(allUser)
  } catch (error) {
    console.log(error)
    // res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
  });

  // Delete a user 
router.delete('/delete/:id', authenticate ,async (request, response) => {
  let userId = request.params.id;
  try {
    let user = await AllUsers.findByIdAndDelete(userId);
    response.status(200).json({
      msg : 'Deleted Succesfully',
      user : user
  })
  }
  catch (error) {
    response.status(500).json({
        msg : "Server Error"
      })
  }
  })
module.exports = router;