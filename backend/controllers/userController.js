import User from "../models/userModel.js";

export const signUp = async (req, res) => {
  try {
    const { username, name, email, password } = req.body;
    if (!username || !!name || !email || !password) {
      return res.status(400).json({ message: "Fill all the fields!" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exist!" });
    }
    const hashedPassword = bcrypt.hash(password, 10);
    const userSignUp = User.create({
      username,
      name,
      email,
      password: hashedPassword,
    });

    const token = await jwtToken(userSignUp._id);
    res.cookie(token, "token", {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "lax",
      secure: false,
    });

    return res.status(201).json(`User created successfully! ${userSignUp}`);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `SignUp user error ${error.message}` });
  }
};
