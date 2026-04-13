import express from "express";
import connectDB from "./connection.js";
import { productsModel } from "./schema.js";
import cors from "cors";

const app = express();
app.use(cors()); // this way it allows every request

connectDB(); //connect the db

app.get("/", (req, res) => {
  res.send("<h1>Homepage</h1>");
});

app.get("/products", async (req, res) => {
  try {
    //normall we use zod for this but we are doing this normmlly down below
    const page = Math.max(1, req.query.page || 1); //to make sure the correct page req is received even if someone puts negative so this logic will dont let wrong value to fill.
    const limit = Math.max(1, req.query.limit || 5);
    const offset = (page - 1) * limit; //the formulae to calculate the offset (the items that are needed to be skipped because we want to see the contents of the next page.)

    //query the mongodb database to get the results.
    const data = await productsModel
      .find()
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit);

    //let the total items because we need to show the max pages that user can go in we have to do the calculations that we did down below.
    const totalItems = await productsModel.countDocuments();

    //return in the proper form.
    return res.json({
      data,
      meta: {
        totalItems: totalItems,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: page,
      },
    });
  } catch {
    return res.json({ error: "internal server error" }).statusCode(500);
  }
});

app.listen(8000, () => {
  console.log("server is up!");
});
