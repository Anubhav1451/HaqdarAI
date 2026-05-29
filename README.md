# Haqdar AI ( हकदार AI ) - Context-Aware Multilingual Scheme Discovery Engine

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat&logo=node.js)
![Express](https://img.shields.io/badge/Express-4.x-000000?style=flat&logo=express)
![MongoDB Atlas](https://img.shields.io/badge/MongoDB_Atlas-4EA94B?style=flat&logo=mongodb)
![Gemini](https://img.shields.io/badge/Gemini_2.5_Flash-4285F4?style=flat&logo=google)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5)

---

## 🎯 Value Proposition

**Haqdar AI** bypasses complex government bureaucracy by leveraging cutting-edge LLM parameter extraction and real-time cloud data indexing. Citizens can discover eligible welfare schemes through natural language queries, voice commands, or simple form inputs—eliminating the need to navigate complex government portals and understand technical eligibility criteria.

---

## 🚀 Tech Stack

### Backend
- **Node.js** (v18+) - JavaScript runtime
- **Express.js** (v4.x) - Web framework
- **MongoDB Atlas** - Cloud database with real-time indexing
- **Mongoose** (v9.x) - MongoDB object modeling
- **Gemini 2.5 Flash API** - Google's advanced LLM for parameter extraction
- **Helmet** - Security headers middleware
- **Express Rate Limit** - API abuse prevention
- **CORS** - Cross-origin resource sharing

### Frontend
- **HTML5** - Semantic markup
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide Icons** - Beautiful icon library
- **Chart.js** - Data visualization
- **Web Speech API** - Browser-native voice recognition

---

## ✨ Key Features

### 🤖 AI Unstructured Search
- Natural language query processing using Gemini 2.5 Flash
- Automatic extraction of demographic parameters (age, income, state, profession)
- Context-aware scheme matching based on extracted parameters
- Zero-latency intelligent filtering

### 🎤 Multilingual Voice Discovery
- Web Speech API integration for voice input
- Real-time speech-to-text conversion
- Voice-triggered AI query processing
- Hands-free scheme discovery experience

### 🏗️ Production MVC Architecture
- **Models**: Robust MongoDB schemas with validation
- **Controllers**: Centralized business logic and database operations
- **Routes**: Clean API endpoint definitions
- **Middleware**: Security, error handling, and rate limiting
- **Config**: Centralized configuration management

### ⚡ Zero-Lag Skeleton UX
- Beautiful Tailwind skeleton shimmer cards
- Instant visual feedback during data fetching
- Smooth loading transitions
- Professional loading states for all async operations

### 📊 Seeded Database
- 21 live government schemes pre-loaded
- Real eligibility criteria and financial benefits
- Document requirements tracking
- State and profession-based filtering

---

## 🏛️ System Architecture

```
User Query (Text/Voice)
         ↓
   Frontend Interface
         ↓
   POST /api/ai/process-query
         ↓
   Gemini 2.5 Flash API
         ↓
   JSON Parameter Extraction
   { age, income, state, profession }
         ↓
   MongoDB Atlas Query
         ↓
   Dynamic Filtering Logic
         ↓
   Matching Schemes Array
         ↓
   Bento Grid Rendering
         ↓
   Tailwind CSS Cards Display
```

---

## 📁 Project Structure

```
haqdar-ai/
├── config/
│   └── db.js                 # Database configuration
├── controllers/
│   ├── schemeController.js   # Scheme business logic
│   └── aiController.js       # AI query processing
├── middleware/
│   └── errorHandler.js       # Global error handling
├── models/
│   └── Scheme.js             # MongoDB schema
├── routes/
│   ├── schemeRoutes.js       # Scheme endpoints
│   └── aiRoutes.js           # AI endpoints
├── public/
│   └── index.html            # Frontend application
├── .env                      # Environment variables
├── package.json              # Dependencies
├── seedSchemes.js            # Database seeding
└── server.js                 # Server entry point
```

---

## 🛠️ Local Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/haqdar-ai.git
cd haqdar-ai
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Create a `.env` file in the root directory:

```env
# MongoDB Atlas Configuration
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/haqdar-ai?retryWrites=true&w=majority

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Configuration
FRONTEND_URL=http://localhost:3000

# AI Configuration
GEMINI_API_KEY=your_gemini_api_key_here
```

**Note:** Replace the placeholder values with your actual credentials:
- `MONGO_URI`: Your MongoDB Atlas connection string
- `GEMINI_API_KEY`: Your Google Gemini API key

4. **Start the development server**
```bash
npm run dev
```

5. **Access the application**
- Open your browser and navigate to: `http://localhost:5000`
- Health check endpoint: `http://localhost:5000/health`

---

## 📡 API Endpoints

### Scheme Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/schemes` | Get all schemes with optional filters |
| GET | `/health` | Server health check |

### AI Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/ai/process-query` | Process unstructured query with AI |

### Example API Usage

#### Get All Schemes
```bash
curl http://localhost:5000/api/schemes
```

#### AI Query Processing
```bash
curl -X POST http://localhost:5000/api/ai/process-query \
  -H "Content-Type: application/json" \
  -d '{"query": "I am a 25 year old farmer from Maharashtra with income 200000"}'
```

#### Filter Schemes
```bash
curl "http://localhost:5000/api/schemes?age=25&income=200000&state=Maharashtra&profession=Farmer"
```

---

## 🔒 Security Features

- **Helmet**: Secure HTTP headers
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **CORS**: Configurable cross-origin policies
- **Environment Variables**: Sensitive data protection
- **Input Validation**: Request body validation
- **Error Handling**: Centralized error middleware

---

## 📊 Database Schema

### Scheme Model
```javascript
{
  title: String (required, indexed),
  category: String (required, enum),
  financialBenefit: String (required),
  minAge: Number (default: 0),
  maxAge: Number,
  maxIncome: Number,
  allowedStates: [String],
  allowedProfessions: [String],
  documentsRequired: [String],
  matchPercentageDescription: String
}
```

---

## 🎨 Frontend Features

- **Bento Grid Layout**: Modern card-based UI
- **Skeleton Loading**: Zero-lag loading states
- **Voice Input**: Web Speech API integration
- **Real-time Filtering**: Instant scheme matching
- **Document Verification**: Upload and verify documents
- **Responsive Design**: Mobile-friendly interface
- **Dark Theme**: Premium dark mode with glassmorphism

---

## 🚢 Deployment

### Production Setup

1. **Set environment variables**
```env
NODE_ENV=production
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/haqdar-ai
PORT=5000
FRONTEND_URL=https://your-domain.com
GEMINI_API_KEY=your_production_gemini_key
```

2. **Install production dependencies**
```bash
npm install --production
```

3. **Start production server**
```bash
npm start
```

### Recommended Process Manager
```bash
npm install -g pm2
pm2 start server.js --name haqdar-ai
```

---

## 📝 Development Scripts

```bash
npm start        # Start production server
npm run dev      # Start development server with nodemon
npm run seed     # Seed database with government schemes
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

ISC

---

## 👥 Support

For issues and questions, please open an issue on GitHub or contact the development team.

---

**Built with ❤️ for citizens seeking government welfare schemes**
