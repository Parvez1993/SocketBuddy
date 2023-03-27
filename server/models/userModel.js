const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");


const userModel = mongoose.Schema({
  name: { type: "String", trim: true },
  email: { type: "String", trim: true },
  password: { type: "String", trim: true },
  pic: { type: "String", default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" },
}, {
  timestamp: true
})



userModel.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // // Delete passwordConfirm field
  // this.passwordConfirm = undefined;
  next();
});

//check if password is correct or not

userModel.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userModel)

module.exports = User