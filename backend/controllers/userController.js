import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { jwtToken } from "../utils/jwt.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
export const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Fill all the fields!" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exist!" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "password must be atleast 6 characters!" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userSignUp = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = await jwtToken(userSignUp._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "lax",
      secure: false,
    });

    return res.status(201).json({
      message: "User created successfully!",
      user: userSignUp,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `SignUp user error ${error.message}` });
  }
};

export const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "User does not exist!" });
    }
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    const token = jwtToken(existingUser._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "lax",
    });
    return res
      .status(200)
      .json({ message: "Login Successful!", user: existingUser });
  } catch (error) {
    return res.status(500).json({
      message: `Login error: ${error.message}`,
    });
  }
};

export const logOut = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout successfully!" });
  } catch (error) {
    return res.status(500).json({
      message: `Logout error: ${error.message}`,
    });
  }
};

export const profile = async (req, res) => {
  try {
    const { name } = req.body;
    let imageUrl;
    if (req.file) {
      imageUrl = await uploadOnCloudinary(req.file.path);
    }
    let user = await User.findByIdAndUpdate(req.user_id, {
      name,
      image: imageUrl,
    });
    if (!user) {
      return res.status(400).json({ message: "User is not found!" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      message: `profile error: ${error.message}`,
    });
  }
};
