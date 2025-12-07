import jwt from "jsonwebtoken";
export const isAuth = async (req, res, next) => {
  try {
    let token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ message: "Token is not found!" });
    }
    let decoded = await jwt.verify(token, process.env.JWT_TOKEN);
    console.log(decoded);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: `Invalid or Expired token ${error.message}` });
  }
};
