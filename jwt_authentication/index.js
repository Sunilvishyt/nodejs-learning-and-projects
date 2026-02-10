import express from "express";
import { connectDB } from "./connection.js";
import { loginHandler, registerHandler } from "./controller/user.js";
import { renderHomePage } from "./controller/staticController.js";
import path from "path";
import {
  renderLoginPage,
  renderRegisterPage,
  logoutHandler,
} from "./controller/user.js";
import { checkForAuthentication } from "./middleware/auth.js";
import cookieParser from "cookie-parser";

const app = express();
connectDB();

//middleware
app.set("view engine", "ejs");
app.set("views", path.resolve("./view"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//routes
app.get("/", checkForAuthentication, renderHomePage);

app.get("/login", renderLoginPage);
app.post("/login", loginHandler);
app.get("/logout", logoutHandler);

app.get("/register", renderRegisterPage);
app.post("/register", registerHandler);

app.listen(8000, () => {
  console.log("server is started ✅");
});
