import express from "express";
import { connectDB } from "./connection.js";
import {
  generateShortId,
  getRedirected,
  renderHomePage,
} from "./controller/url.js";
import path from "path";

const app = express();
connectDB();

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join("./view"));

//routes
app.get("/", renderHomePage);
app.post("/", generateShortId);
app.get("/:shortId", getRedirected);

app.listen(8000, () => console.log("server is up"));
