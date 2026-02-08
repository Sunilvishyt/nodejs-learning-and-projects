import { urlModel } from "../model/url.js";
import QRCode from "qrcode";

async function generateQRCode(url) {
  try {
    return await QRCode.toDataURL(url);
  } catch (err) {
    console.log("Error generating QR code:", err);
    return null;
  }
}

export const renderHomePage = async (req, res) => {
  try {
    const realdata = await urlModel.find({ isActive: true });
    const data = realdata.reverse();

    // Generate QR codes for each URL
    const dataWithQR = await Promise.all(
      data.map(async (item) => {
        const qrCode = await generateQRCode(
          `http://localhost:8000/${item.urlid}`,
        );
        return { ...item.toObject(), qrCode };
      }),
    );

    return res.render("home", {
      data: dataWithQR,
      error: req.query.error || null,
      success: req.query.success || null,
    });
  } catch (error) {
    console.error("Error rendering home page:", error);
    res.status(500).render("home", { data: [], error: "Error loading URLs" });
  }
};
