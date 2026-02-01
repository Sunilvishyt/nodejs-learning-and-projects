import uniqid from "uniqid";
import { urlModel } from "../model/url.js";

async function shortIdExists(shortId) {
  let currentShortId = shortId;
  while (true) {
    const exists = await urlModel.findOne({ urlid: currentShortId });
    if (exists) {
      currentShortId = uniqid().slice(-8);
    } else {
      return currentShortId;
    }
  }
}

export const renderHomePage = async (req, res) => {
  const realdata = await urlModel.find();
  const data = realdata.reverse();
  return res.render("home", {
    data: data,
  });
};
export const generateShortId = async (req, res) => {
  const data = req.body;
  const uniqueid = await shortIdExists(uniqid().slice(-8));
  await urlModel.create({
    urlid: uniqueid,
    redirect: data.url,
  });
  res.redirect("/");
};

export const getRedirected = async (req, res) => {
  const shortId = req.params.shortId;
  const data = await urlModel.findOne({ urlid: shortId });
  if (data) return res.redirect(data.redirect);
  else return res.json({ "error ": "not found" });
};
