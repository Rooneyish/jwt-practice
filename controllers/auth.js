import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET || "secretKey";

export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const isUserExist = await User.findOne({ email: email });

    console.log(isUserExist);

    if (isUserExist) {
      throw new Error("User already exist.");
    }

    // Hashing
    const salt = bcrypt.genSaltSync(10);
    const hastedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hastedPassword,
    });

    const token = jwt.sign({ id: newUser._id }, secretKey, { expiresIn: "1h" });

    res.json({
      success: true,
      message: "User registered successfully !",
      data: {
        user: newUser,
        token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (req,res) => {
  try {
    const { email, password } = req.body;

    const isUserExist = await User.findOne({ email: email });

    console.log(isUserExist);

    if (!isUserExist) {
      throw new Error("Email or Password not valid!");
    }

    const isPasswordValid = await bcrypt.compare(password, isUserExist.password);

    if(!isPasswordValid){
      throw new Error("Email or Password not valid!");
    }

    const token = jwt.sign({ id: isUserExist._id }, secretKey, { expiresIn: "1h" });

    res.json({
      success: true,
      message: "User Logged-In successfully !",
      data: {
        user: isUserExist,
        token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
