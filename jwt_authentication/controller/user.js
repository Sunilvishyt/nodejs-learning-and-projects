import jwt from "jsonwebtoken";
import { userModel } from "../model/user.js";
import dotenv from "dotenv/config";

export const renderLoginPage = async (req, res) => {
  res.render("login");
};

export const renderRegisterPage = async (req, res) => {
  res.render("register");
};

export const loginHandler = async (req, res) => {
  const data = req.body;
  const userexists = await userModel.findOne({ username: data.username });
  if (userexists) {
    if (userexists.password === data.password) {
      const token = jwt.sign({ id: userexists._id }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });
      res.cookie("uid", token);
      return res.redirect("/");
    }
  }
  return res.render("login");
};

export const registerHandler = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const username_exists = await userModel.findOne({ username: username });
  if (!username_exists) {
    const create_user = await userModel.create({
      username: username,
      password: password,
    });
    return res.json({
      ...create_user,
      success: "user successfully registered",
    });
  } else {
    return res.json({ error: "username already taken" });
  }
};

export const logoutHandler = async (req, res) => {
  res.clearCookie("uid");
  return res.redirect("/login");
};
