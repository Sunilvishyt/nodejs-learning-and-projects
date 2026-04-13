import exresss from "express";
import connectDB from "./connection.js";
import { productsModel } from "./schema.js";
import cors from "cors";

const app = exresss();
connectDB();
app.use(cors());

app.get("/api/products/cursor", async (req, res) => {
  const maxLimit = 5;
  const limit = Math.max(maxLimit, req.query.limit || maxLimit);
  const cursor = req.query.cursor;

  try {
    const query = cursor ? { _id: { $lt: cursor } } : {};

    //retrive the next 6 items from the database
    const products = await productsModel
      .find(query)
      .sort({ _id: -1 })
      .limit(limit + 1)
      .exec(); //-1 means newest first 1 means old first.

    //check if there nextpage if we successfully retrived 6 items from database means yes there is next page.
    const hasNextPage = products.length > limit; //returns true if there is 6 items retrived from the database. otherwise if there are less than 6 items theres not next page.

    //if next page is there then return 5 items not 6 thats why slice.
    const results = hasNextPage ? products.slice(0, -1) : products;
    const nextCursor =
      results.length > 0 ? results[results.length - 1]._id : null;
    console.log("sending results");
    return res.json({
      data: results,
      nextCursor: nextCursor,
    });
  } catch {
    return res.json({ error: "internal server error" });
  }
});

app.listen(8000, () => {
  console.log("server up");
});
