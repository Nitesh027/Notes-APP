const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdOn: {
    type: Date,
    default: Date.now, // ✅ Yeh line new user banate waqt current time store karegi
  },
});

module.exports = mongoose.model("User", userSchema);
