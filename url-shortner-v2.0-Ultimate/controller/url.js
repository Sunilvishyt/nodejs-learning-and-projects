import uniqid from "uniqid";
import { urlModel } from "../model/url.js";
import validator from "validator";

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

function getClientIp(req) {
  return (
    req.headers["x-forwarded-for"] || req.connection.remoteAddress || "unknown"
  );
}

export const generateShortId = async (req, res) => {
  try {
    const { url, customUrl } = req.body;

    // Validate URL
    if (!url || !validator.isURL(url)) {
      return res.redirect("/?error=Invalid URL format");
    }

    // Check if custom URL is provided and valid
    let uniqueid;
    if (customUrl && customUrl.trim()) {
      const customIdExists = await urlModel.findOne({
        urlid: customUrl.trim(),
      });
      if (customIdExists) {
        return res.redirect("/?error=Custom URL already exists");
      }
      // Validate custom URL (alphanumeric and hyphens only)
      if (!/^[a-zA-Z0-9-_]+$/.test(customUrl.trim())) {
        return res.redirect(
          "/?error=Custom URL can only contain letters, numbers, hyphens, and underscores",
        );
      }
      uniqueid = customUrl.trim();
    } else {
      uniqueid = await shortIdExists(uniqid().slice(-8));
    }

    // Add security check: add expiration (default 90 days)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 90);

    await urlModel.create({
      urlid: uniqueid,
      redirect: url,
      expiresAt: expiresAt,
    });

    res.redirect("/?success=URL shortened successfully!");
  } catch (error) {
    console.error("Error generating short ID:", error);
    res.redirect("/?error=Error creating short URL");
  }
};

export const getRedirected = async (req, res) => {
  try {
    const shortId = req.params.shortId;
    const data = await urlModel.findOne({ urlid: shortId, isActive: true });

    if (!data) {
      return res.status(404).json({ error: "URL not found" });
    }

    // Check if URL has expired
    if (data.expiresAt && new Date() > data.expiresAt) {
      await urlModel.updateOne({ urlid: shortId }, { isActive: false });
      return res.status(410).json({ error: "This URL has expired" });
    }

    // Track click
    const ipAddress = getClientIp(req);
    await urlModel.updateOne(
      { urlid: shortId },
      {
        $inc: { clicks: 1 },
        lastClickedAt: new Date(),
        $push: {
          clickHistory: {
            timestamp: new Date(),
            ipAddress: ipAddress,
          },
        },
      },
    );

    return res.redirect(data.redirect);
  } catch (error) {
    console.error("Error in redirect:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

export const deleteUrl = async (req, res) => {
  try {
    const { urlId } = req.params;
    const result = await urlModel.findOneAndUpdate(
      { urlid: urlId },
      { isActive: false },
      { new: true },
    );

    if (!result) {
      return res.status(404).json({ error: "URL not found" });
    }

    res.redirect("/?success=URL deleted successfully!");
  } catch (error) {
    console.error("Error deleting URL:", error);
    res.redirect("/?error=Error deleting URL");
  }
};

export const getAnalytics = async (req, res) => {
  try {
    const { urlId } = req.params;
    const urlData = await urlModel.findOne({ urlid: urlId });

    if (!urlData) {
      return res.status(404).json({ error: "URL not found" });
    }

    res.json({
      urlid: urlData.urlid,
      originalUrl: urlData.redirect,
      clicks: urlData.clicks,
      createdAt: urlData.createdAt,
      lastClickedAt: urlData.lastClickedAt,
      expiresAt: urlData.expiresAt,
      recentClicks: urlData.clickHistory.slice(-10),
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const getAllAnalytics = async (req, res) => {
  try {
    const urls = await urlModel.find({ isActive: true });
    const analytics = urls.map((url) => ({
      urlid: url.urlid,
      originalUrl: url.redirect,
      clicks: url.clicks,
      createdAt: url.createdAt,
      lastClickedAt: url.lastClickedAt,
      expiresAt: url.expiresAt,
    }));

    res.json(analytics);
  } catch (error) {
    console.error("Error fetching all analytics:", error);
    res.status(500).json({ error: "Server error" });
  }
};
