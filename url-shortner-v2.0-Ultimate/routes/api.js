import express from "express";
import { getAnalytics, getAllAnalytics } from "../controller/url.js";

export const apiRouter = express.Router();

apiRouter.get("/analytics/:urlId", getAnalytics);
apiRouter.get("/analytics/", getAllAnalytics);
