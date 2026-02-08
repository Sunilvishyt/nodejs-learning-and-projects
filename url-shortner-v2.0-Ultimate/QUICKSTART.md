# ⚡ Quick Start Guide - URL Shortener v2.0

## 1️⃣ Install Dependencies (First-Time Setup)

```bash
npm install
```

This installs all required packages including the new ones:

- `qrcode` - For QR code generation
- `validator` - For URL validation

## 2️⃣ Start the Application

```bash
# Development mode (auto-reload on file changes)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:8000`

## 3️⃣ Basic Usage

### Create a Standard Short URL

1. Go to http://localhost:8000
2. Paste a long URL in the "Original URL" field
3. Leave "Custom Short URL" empty
4. Click "Generate Short URL"
5. Your URL appears in the list with a generated short code

**Example:**

- Original: `https://www.example.com/very/long/path?id=123&name=test`
- Short: `http://localhost:8000/abc12345`

### Create a Custom Short URL

1. Go to http://localhost:8000
2. Paste your long URL
3. Enter a memorable custom URL (letters, numbers, hyphens, underscores only)
4. Click "Generate Short URL"

**Example:**

- Original: `https://github.com/your-repo/very-long-readme`
- Custom URL: `my-github`
- Short: `http://localhost:8000/my-github`

## 4️⃣ Key Features

### 📋 Copy to Clipboard

- Find your short URL in the list
- Click the "📋 Copy" button
- Button changes to "✅ Copied!"
- Paste your link anywhere

### 📱 Share QR Code

- Each URL card shows a QR code on the right
- Scan with any smartphone camera
- Automatically redirects to original URL
- Perfect for marketing materials

### 📊 View Analytics

- Click the "📊 Analytics" button on any URL card
- Opens a new tab with detailed stats
- Shows click count, timestamps, and IP addresses
- Perfect for understanding link performance

### 🗑️ Delete URLs

- Click the "🗑️ Delete" button
- Confirm the deletion
- URL is removed from the list (soft delete keeps data)
- No longer accessible to visitors

## 5️⃣ Understanding the Dashboard

### Statistics Section

Shows your overall metrics:

- **Total URLs**: How many short URLs you've created
- **Total Clicks**: Combined clicks across all links

### URL Cards

Each card displays:

- **Short URL**: Your generated link (purple/gradient background)
- **Copy Button**: One-click copy to clipboard
- **Original URL**: The long URL being shortened (first 60 chars with preview)
- **Created Date**: When you created the link (📅 format)
- **Click Count**: How many times people clicked (👆 format)
- **Last Clicked**: When the last person visited (🕐 format)
- **QR Code**: Scannable code on the right side
- **Analytics Button**: View detailed stats
- **Delete Button**: Remove the URL

## 6️⃣ API Usage (For Developers)

### Get Analytics for One URL

```bash
GET http://localhost:8000/api/analytics/my-link
```

Returns:

```json
{
  "urlid": "my-link",
  "originalUrl": "https://example.com/...",
  "clicks": 42,
  "createdAt": "2026-02-06T10:30:00.000Z",
  "lastClickedAt": "2026-02-06T15:45:30.000Z",
  "expiresAt": "2026-05-07T10:30:00.000Z",
  "recentClicks": [
    {
      "timestamp": "2026-02-06T15:45:30.000Z",
      "ipAddress": "192.168.1.1"
    }
  ]
}
```

### Get Analytics for All URLs

```bash
GET http://localhost:8000/api/analytics
```

Returns array of all URL analytics.

## 7️⃣ Troubleshooting

### Error: "Invalid URL format"

**Problem**: URL you entered is not valid
**Solution**: Make sure it starts with `http://` or `https://`

### Error: "Custom URL already exists"

**Problem**: Someone else already used that custom URL
**Solution**: Choose a different custom URL

### Error: "Custom URL can only contain letters, numbers, hyphens, and underscores"

**Problem**: Special characters in custom URL
**Solution**: Use only: a-z, A-Z, 0-9, hyphens (-), underscores (\_)

### QR Code Not Showing

**Problem**: QR code image doesn't appear
**Solution**:

- Clear browser cache (Ctrl+Shift+Delete)
- Check browser console for errors
- Ensure qrcode package is installed

### Can't Copy to Clipboard

**Problem**: Copy button doesn't work
**Solution**:

- Works best on HTTPS (localhost works fine)
- Try updating your browser
- Check if clipboard permissions are granted

### Server Won't Start

**Problem**: Connection refused or already in use
**Solution**:

- Port 8000 might be in use
- Change port in `index.js`: `app.listen(PORT, ...)`
- Or kill the process using port 8000

## 8️⃣ Database Info

The app uses MongoDB to store URLs, clicks, and analytics.

### Auto-Expiration

- URLs automatically expire after **90 days**
- Expired URLs are deactivated (but data remains)
- Good for keeping the system clean

### Soft Deletion

- When you delete a URL, it's marked `isActive: false`
- Data is never permanently lost
- Great for record-keeping

## 9️⃣ Pro Tips

✨ **Use custom URLs for campaigns**

- `promo-summer-2026`
- `product-demo-v2`
- `customer-feedback`

📊 **Monitor your top links**

- Check analytics regularly
- See which content drives the most traffic
- Plan future content based on click data

🎨 **QR codes for offline**

- Print QR codes in flyers
- Use in presentations
- Great for events and conferences

🔗 **Share analytics**

- Use `/api/analytics` to build custom dashboards
- Integrate with marketing tools
- Track performance across campaigns

## 🔟 Environment Setup

Create a `.env` file in the root directory:

```env
MONGO_URI=mongodb://localhost:27017/urlshortener
PORT=8000
NODE_ENV=development
```

**Variables:**

- `MONGO_URI`: MongoDB connection string
- `PORT`: Server port (default: 8000)
- `NODE_ENV`: Set to `development` or `production`

## Next Steps

1. ✅ Install dependencies: `npm install`
2. ✅ Start server: `npm run dev`
3. ✅ Create your first short URL
4. ✅ Copy and share
5. ✅ Check analytics
6. ✅ Explore the API

Enjoy! 🚀

---

**Need help?**

- Check the browser console for errors (F12)
- Read the detailed README.md
- Review the FEATURES.md for all capabilities
- Check error messages - they're designed to be helpful!

**Version 2.0** - More features. Better performance. Totally awesome! 🎉
