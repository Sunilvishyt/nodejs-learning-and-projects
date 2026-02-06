import express from "express";
import connectDB from "./connection.js";
import { userRouter } from "./routes/users.js";
import path from "path";
const app = express();
connectDB();

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.resolve("./view"));
app.use("/auth", userRouter);

app.get("/", async (req, res) => {
  res.render("home");
});

app.listen(8000, console.log("server is running!"));
