import { userModel } from "../model/user.js";

export const renderHomePage = async (req, res) => {
  const user = await userModel.findById(req.user.id);
  res.render("home", { username: user.username });
};
