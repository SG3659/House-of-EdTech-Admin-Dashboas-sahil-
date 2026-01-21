import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import prisma from "../config/dbconfig.js";
dotenv.config();
const AuthMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    // const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Please login or Register." });
    }

    const tokenWithoutBearer = token.replace("Bearer ", "");
    if (!tokenWithoutBearer) {
      return res.status(401).json({ message: "Please login or Register." });
    }

    const verified = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET_KEY);
    const user = await prisma.user.findUnique({
      where: {
        id: verified.id,
      },
      select: {
        id: true,
        email: true,
      },
    });
    if (!user) return res.status(401).json({ message: "User not found" });
    req.auth = user;
    next();
  } catch (error) {
    console.log(error.message);
    return res
      .status(401)
      .json({ message: "Token expired. Please log in again." });
  }
};

export default AuthMiddleware;
