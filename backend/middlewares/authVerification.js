import jwt from "jsonwebtoken";
import { error } from "../utils/error.js";

export async function authVerification(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    // return next(error(401, "Please login to access this route", res));
    return res.status(401).json({
      error: "Please login to access this route",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(err);
    }
    req.user = user;
    next();
  });
}
