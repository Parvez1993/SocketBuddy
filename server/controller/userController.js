
const User = require("../models/userModel");
const { BadRequestError, UnAuthenticatedError } = require("../errors/index.js");
const { StatusCodes } = require("http-status-codes");
var jwt = require("jsonwebtoken");


const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const createSendToken = async (user, statusCode, req, res) => {
    const token = signToken(user._id);
    const cookieOptions = {
        maxAge: 300000 * 60 * 15,
        httpOnly: true,
      };
    
      await res.cookie("jwt", token, cookieOptions);



    // Remove password from output
    user.password = undefined;

    res.status(statusCode).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        pic: user.pic,
        token: token,
    });
};


exports.register = async (req, res, next) => {
    const { name, password, email } = req.body;
    if (!name || !email || !password) {
        throw new BadRequestError("Please provide all the values");
    }

    if (!name || !email || !password) {
        throw new BadRequestError("please provide all values");
    }
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
        throw new BadRequestError("Email already in use");
    }
    const user = await User.create(req.body);

    createSendToken(user, StatusCodes.CREATED, req, res);
};




exports.login = async (req, res, next) => {
    const { email, password } = req.body;
  
    // 1) Check if email and password exist
    if (!email || !password) {
      throw new BadRequestError("Please provide all the values");
    }
    // 2) Check if user exists && password is correct
    const user = await User.findOne({ email }).select("+password");
  
    if (!user || !(await user.correctPassword(password, user.password))) {
      throw new UnAuthenticatedError("Incorrect credentials");
    }
  
    // 3) If everything ok, send token to client
  
    createSendToken(user, StatusCodes.CREATED, req, res);
  };


exports.allUsers = async(req, res, next) => {
    const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
    const users = await User.find(keyword).find({ _id: { $ne: req.user.userId } });
    res.send(users);

}