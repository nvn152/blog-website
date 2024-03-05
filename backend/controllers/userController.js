import User from "../models/userModel.js";
import { error } from "../utils/error.js";
import bcryptjs from "bcryptjs";

const test = (req, res) => {
  res.json("Controller is working");
};

const update = async (req, res, next) => {
  // if (req.body.id !== req.params.id) {
  //   return next(error(400, "Please provide all the required fields!!", res));
  // }

  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(
        error(400, "Password must be at least 6 characters long!", res)
      );
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }

  if (req.body.username) {
    if (req.body.username.length < 6 || req.body.username.length > 16) {
      return next(
        error(400, "Username must be at least 6 characters long!", res)
      );
    }

    if (req.body.username.includes(" ")) {
      return next(error(400, "Username cannot contain spaces!", res));
    }

    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(error(400, "Username must be lowercase!", res));
    }

    if (!req.body.username.match(/^[a-zA-Z0-9_-]+$/)) {
      return next(
        error(400, "Username cannot contain special characters!", res)
      );
    }
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      { new: true }
    );
    const { password, ...updatedUserWithoutPassword } = updatedUser._doc;
    res.status(200).json({ success: true, user: updatedUserWithoutPassword });

    console.log(updatedUserWithoutPassword);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  if (req.params.id !== req.user.id) {
    return next(error(401, "Unauthorized!", res));
  }

  try {
    await User.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

const signout = (req, res, next) => {
  try {
    res.clearCookie("token");
    res
      .status(200)
      .json({ success: true, message: "User signed out successfully" });
  } catch (error) {
    next(error);
  }
};

const getUsers = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(error(401, "Unauthorized!", res));
  }
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    const users = await User.find({})
      .skip(startIndex)
      .limit(limit)
      .sort({ createdAt: sortDirection });

    const usersWithoutPassword = users.map((user) => {
      const { password, ...userWithoutPassword } = user._doc;
      return userWithoutPassword;
    });

    const totalUsers = await User.countDocuments({});

    const now = new Date();
    const oneMonthAge = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const usersInLastMonth = await User.countDocuments({
      createdAt: { $gte: oneMonthAge },
    });
    res.status(200).json({
      success: true,
      users: usersWithoutPassword,
      totalUsers,
      usersInLastMonth,
    });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return next(error(404, "User not found!"));
    }
    const { password, ...userWithoutPassword } = user._doc;
    res.status(200).json({ success: true, user: userWithoutPassword });
  } catch (error) {
    next(error);
  }
};

export { test, update, deleteUser, signout, getUsers, getUser };
