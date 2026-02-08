# 🔗 URL Shortener - Advanced Edition

A modern, feature-rich URL shortener application built with Node.js, Express, and MongoDB.

## ✨ Features

### Core Features

- **Create Short URLs** - Convert long URLs into compact, shareable links
- **Custom URLs** - Define your own custom short URL instead of auto-generated ones
- **Click Analytics** - Track the number of clicks and view detailed statistics
- **QR Code Generation** - Automatically generate QR codes for each short URL
- **Copy to Clipboard** - One-click copying of short URLs with visual feedback
- **URL Validation** - Validates input URLs before creating short links
- **Expiration Dates** - URLs automatically expire after 90 days
- **Click History** - View IP addresses and timestamps of clicks
- **Delete URLs** - Safely delete short URLs you no longer need
- **Responsive Design** - Beautiful, mobile-friendly interface

### Advanced Features

- **Statistics Dashboard** - View total URLs and total clicks at a glance
- **Analytics API** - RESTful API endpoints to fetch analytics data
- **Click Tracking** - Track individual clicks with IP addresses and timestamps
- **URL Deactivation** - Soft delete functionality for data preservation
- **Modern UI** - Gradient design with smooth animations

## 🚀 Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Create a `.env` file** in the root directory:

   ```
   MONGO_URI=mongodb://localhost:27017/urlshortener
   PORT=8000
   NODE_ENV=development
   ```

3. **Start the application:**

   ```bash
   npm run dev    # Development mode with auto-reload
   npm start      # Production mode
   ```

4. **Open your browser:**
   ```
   http://localhost:8000
   ```

## 📚 API Endpoints

### Web Interface

- `GET /` - Home page with URL creation form
- `POST /` - Create a new short URL
- `GET /:shortId` - Redirect to original URL
- `GET /delete/:urlId` - Delete a short URL

### REST API

- `GET /api/analytics/:urlId` - Get analytics for a specific short URL
- `GET /api/analytics` - Get analytics for all URLs

## 📊 Analytics Example

```json
{
  "urlid": "abc12345",
  "originalUrl": "https://example.com/very/long/url",
  "clicks": 42,
  "createdAt": "2026-02-06T10:30:00Z",
  "lastClickedAt": "2026-02-06T15:45:30Z",
  "expiresAt": "2026-05-07T10:30:00Z",
  "recentClicks": [
    {
      "timestamp": "2026-02-06T15:45:30Z",
      "ipAddress": "192.168.1.1"
    }
  ]
}
```

## 🗄️ Database Schema

### URL Document

```javascript
{
  urlid: String (unique identifier),
  redirect: String (original URL),
  createdAt: Date (creation timestamp),
  clicks: Number (click count),
  lastClickedAt: Date (last access timestamp),
  clickHistory: [
    {
      timestamp: Date,
      ipAddress: String
    }
  ],
  expiresAt: Date (expiration date),
  isActive: Boolean (soft delete flag)
}
```

## 🎨 UI Features

### Create URL Form

- URL input with validation
- Optional custom short URL field
- Real-time error messages
- Success notifications

### URL Cards

- Display short URL with copy button
- Original URL preview
- Creation date
- Click count
- Last click date
- QR code for easy sharing
- Analytics button
- Delete button

### Statistics

- Total URLs count
- Total clicks across all URLs
- Individual URL analytics

## 💡 Usage Examples

### Create a Standard Short URL

1. Paste your long URL in the form
2. Click "Generate Short URL"
3. Your short URL will appear in the list

### Create a Custom Short URL

1. Paste your long URL
2. Enter a custom short URL (e.g., "my-project")
3. Click "Generate Short URL"
4. Use `http://localhost:8000/my-project`

### Share with QR Code

1. Scan the QR code displayed next to each URL
2. Automatically redirects to the original URL
3. Works on any device with a camera

### View Analytics

1. Click the "📊 Analytics" button on any URL card
2. View detailed statistics in JSON format
3. See recent clicks and IP addresses

## 🔒 Security Features

- URL validation using validator.js
- Custom URL validation (alphanumeric, hyphens, underscores)
- Soft delete for data preservation
- Expiration date handling
- IP tracking for click analysis
- Input sanitization

## 🛠️ Technologies Used

- **Backend**: Express.js (Node.js)
- **Database**: MongoDB with Mongoose
- **Frontend**: EJS templates
- **QR Code**: qrcode npm package
- **Validation**: validator npm package
- **Unique IDs**: uniqid npm package

## 📝 Recent Enhancements (Version 2.0)

- ✅ Added click analytics and tracking
- ✅ Implemented QR code generation
- ✅ Added custom URL support
- ✅ Redesigned UI with modern gradient design
- ✅ Added delete functionality
- ✅ Implemented copy-to-clipboard
- ✅ Added URL validation
- ✅ Created REST API endpoints
- ✅ Added expiration dates
- ✅ Implemented click history with IP tracking
- ✅ Added statistics dashboard
- ✅ Improved error handling

## 🚀 Future Enhancement Ideas

- User authentication and accounts
- URL categories and tags
- Bulk URL creation
- Advanced analytics with charts
- Email notifications
- Password protection for URLs
- Rate limiting
- Download click reports
- Custom domain support
- Edit URL functionality

## 📄 License

ISC

## 👨‍💻 Development

### Development Mode

```bash
npm run dev
```

Starts the server with auto-reload on file changes.

### Production Mode

```bash
npm start
```

Starts the server in production mode.

## 🐛 Troubleshooting

### MongoDB Connection Error

- Ensure MongoDB is running
- Check the `MONGO_URI` in your `.env` file
- Verify MongoDB is accessible

### QR Code Not Showing

- Check browser console for errors
- Ensure qrcode package is installed
- Try clearing browser cache

### Custom URL Already Exists

- Choose a different custom URL
- Check if it's already in use

## 📞 Support

For issues and questions, please check the error messages in the UI or browser console.

---

**Happy URL Shortening!** 🎉
