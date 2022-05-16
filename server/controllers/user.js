//Business Logic
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModel from "../models/user.js";

const secret = "test";

export const signup = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const oldUser = await UserModel.findOne({ email });

    if (oldUser) {
      return res.status(400).json({
        message: `User with this email ${email} already exists`,
      });
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const result = await UserModel.create({
      userName,
      email,
      password: hashPassword,
      //   googleId: null,
      //   Id: null,
      // createdAt: Date.now(),
      // updatedAt: Date.now(),
      // isAdmin: false,
      // isActive: true,
      // isDeleted: false,
      // isVerified: false,
    });

    const token = jwt.sign(
      {
        id: result._id,
        email: result.email,
      },
      secret,
      { expiresIn: "1h" } // expires in 1 hour time
    );

    res.status(201).json({
      message: "User created successfully",
      result,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Ouch, it's not you, something is wrong with our server",
    });
    console.log(error);
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModel.findOne({ email });

    if (!oldUser) {
      return res.status(404).json({
        message: `User with this email ${email} does not exist`,
      });
    }

    const IsCorrectPassword = await bcrypt.compare(password, oldUser.password);

    if (!IsCorrectPassword) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign(
      {
        email: oldUser.email,
        id: oldUser._id,
      },
      secret, // secret is the same as the one in the server
      { expiresIn: "1h" } // expires in 1 hour time
    );

    res.status(200).json({
      result: oldUser,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Ouch, it's not you, something is wrong with our server",
    });
    console.log(error);
  }
};
