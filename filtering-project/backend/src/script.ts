import express from "express";
import connectDB from "./connection.js";
import { productsModel } from "./schema.js";
import cors from "cors";

const app = express();
app.use(cors()); // this way it allows every request

connectDB();

interface BackendQuery {
  category?: string;
  price?: {
    $gte?: number,
    $lte?: number
  }
  name?: {
    $regex: string,
    $options: string
  }
}


interface ProductQueryParams {
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  search?: string;
}

app.get("/", (req, res) => {
  res.send("<h1>Homepage</h1>");
});

app.get("/products", async (req: express.Request<{}, {}, {}, ProductQueryParams>, res) => {
  try {
    const allCategories = await productsModel.distinct("category");

    const { category, minPrice, maxPrice, search } = req.query;

    const query: BackendQuery = {}; //we will build this to finally fetch frm the database.

    if (category && allCategories.includes(String(category))) {
      query.category = String(category);
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice !== undefined && minPrice !== "") {
        query.price.$gte = Number(minPrice);
      }
      if (maxPrice !== undefined && maxPrice !== "") {
        query.price.$lte = Number(maxPrice);
      }
    }

    if (search) {
      query.name = { $regex: String(search), $options: "i" }; //i means case insensitive search.
    }

    const results = await productsModel.find(query);

    return res.json({
      success: true,
      categories: allCategories,
      data: results,
    });

  } catch (error) {
    console.error("Database error ", error);
    return res
      .status(500)
      .json({
        success: false,
        message: "internal server error try again!",
      })
      ;
  }
});

app.listen(8000, () => {
  console.log("server is up!");
});
