import express from "express";
import { connectDB } from "./connection.js";
import { generateShortId, getRedirected, deleteUrl } from "./controller/url.js";
import { renderHomePage } from "./controller/staticController.js";
import path from "path";
import { apiRouter } from "./routes/api.js";

const app = express();
connectDB();

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join("./view"));
app.use(express.static("public"));
app.use("/api", apiRouter);

//routes
app.get("/", renderHomePage);
app.post("/", generateShortId);
app.get("/delete/:urlId", deleteUrl);
app.get("/:shortId", getRedirected);

app.listen(8000, () =>
  console.log("Server is running at http://localhost:8000"),
);
