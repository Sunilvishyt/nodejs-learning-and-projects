import { userModel } from "../model/users.js";
import bcrypt from "bcrypt";
const salt = await bcrypt.genSalt(10);

export const registerFnc = async (req, res) => {
  const data = req.body;
  const exists = await userModel.findOne({ username: data.username });
  if (exists)
    return res.render("register", { response: "user already exists" });
  const hash_password = await bcrypt.hash(data.password, salt);
  await userModel.create({
    username: data.username,
    password: hash_password,
  });
  res.render("register", {
    response: "user registered successfully - login now via login page",
  });
};

export const loginFnc = async (req, res) => {
  const data = req.body;
  const mongodata = await userModel.findOne({ username: data.username });
  if (!mongodata) return res.render("login", { response: "user not found" });
  const is_password_correct = await bcrypt.compare(
    data.password,
    mongodata.password,
  ); //return true or false.
  if (is_password_correct) {
    return res.render("login", { response: "login successfull" });
  } else {
    return res.render("login", { response: "wrong password" });
  }
};
