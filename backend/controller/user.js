import bcrypt from "bcrypt";
import prisma from "../config/dbconfig.js";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";
export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const isValidEmail = /^[a-zA-Z0-9._%+-]+@example\.com$/.test(email);
    if (!isValidEmail) {
      return next(errorHandler(400, "Only work emails are allowed."));

    }
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return next(errorHandler(400, "Email already in use"));

    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    const { password: _, ...userWithoutPassword } = user;
    return res
      .status(201)
      .json({ message: "User created", user: userWithoutPassword });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const isValidEmail = /^[a-zA-Z0-9._%+-]+@example\.com$/.test(email);
    if (!isValidEmail) {
      return next(errorHandler(400, "Only work emails are allowed."));
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return next(errorHandler(401, "Invalid email or password"));
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {

      return next(errorHandler(401, "Invalid email or password"));
    }
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );

    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      sameSite: "none", // cross-site access --> allow all third-party cookies
      secure: true,
    });
    const { password: _, ...userWithoutPassword } = user;

    return res
      .status(200)
      .json({ message: "Login successful", user: userWithoutPassword, token });
  } catch (error) {
    next(error);
  }
};
