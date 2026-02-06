import express from "express";
import { loginFnc, registerFnc } from "../controller/users.js";

export const userRouter = express.Router();

userRouter
  .post("/register", registerFnc)
  .get("/register", (req, res) => res.render("register", { response: "" }));

userRouter
  .post("/login", loginFnc)
  .get("/login", (req, res) => res.render("login", { response: "" }));
