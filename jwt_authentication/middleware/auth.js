import dotenv from "dotenv/config";
import jwt from "jsonwebtoken";

export const checkForAuthentication = (req, res, next) => {
  const token = req.cookies?.uid;

  if (!token) return res.redirect("/login");

  try {
    const decodedUser = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decodedUser;
    next();
  } catch (err) {
    res.clearCookie("uid");
    return res.redirect("/login");
  }
};
