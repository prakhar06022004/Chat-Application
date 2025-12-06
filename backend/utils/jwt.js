import jwt from "jsonwebtoken";

export const jwtToken = (userId) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_TOKEN, {
      expiresIn: "7d",
    });
    return token;
  } catch (error) {
    console.log(`jwt token error: ${error.message}`);
  }
};

