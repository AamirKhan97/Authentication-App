const mongoose = require("mongoose");

let AllUsersSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: { type: String, required: true },
  contact: { type: String, required: true },
  password: { type: String, required: true },
  created: { type: Date, default: Date.now() },
});

let AllUsers = mongoose.model("All users", AllUsersSchema);
module.exports = AllUsers;
