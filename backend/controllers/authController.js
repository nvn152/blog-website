import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import { error } from "../utils/error.js";
import jwt from "jsonwebtoken";

const signup = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    next(error(400, "Please provide all the required fields!!", res));
  }

  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    next(error(400, "User already registered!", res));
  }

  // hash password
  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(hashedPassword);

  const user = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await user.save();
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (err) {
    next(err);
  }
});

const signin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    return next(error(400, "Please provide all the required fields!!", res));
  }

  const user = await User.findOne({ email });
  if (!user) {
    next(error(404, "User not registered!", res));
    return;
  }

  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.JWT_SECRET,
      { expiresIn: "300m" }
    );

    const { password: password, ...userWithoutPassword } = user._doc;

    res
      .cookie("token", accessToken, {
        httpOnly: true,
      })
      .status(200)
      .json({ success: true, user: userWithoutPassword });
  } else {
    res.status(401);
    throw new Error("email or password is not valid");
  }
});

const googleAuth = asyncHandler(async (req, res, next) => {
  const { email, name, photo } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const accessToken = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "300m" }
      );
      const { password: password, ...userWithoutPassword } = user._doc;
      res.status(200).cookie({ token: accessToken, httpOnly: true }).json({
        success: true,
        user: userWithoutPassword,
      });
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(generatedPassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: photo,
      });
      await newUser.save();
      const accessToken = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "300m" }
      );

      const { password: password, ...userWithoutPassword } = newUser._doc;
      res.status(200).cookie({ token: accessToken, httpOnly: true }).json({
        success: true,
        user: userWithoutPassword,
      });
    }
  } catch (error) {
    next(error);
  }
});

export { signup, signin, googleAuth };
