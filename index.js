// index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const messageRoute = require("./routes/messageRoute"); // Import the message route

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoUri = "mongodb+srv://gabrielazaza23:Sjc5RLKdztnt8ONz@cropcircle.svjbb.mongodb.net/?retryWrites=true&w=majority&appName=CropCircle";
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Existing route for fetching articles
const articleSchema = new mongoose.Schema({
    title: String,
    content: String,
    date: { type: Date, default: Date.now }
});
const Article = mongoose.model("Article", articleSchema);

app.get("/api/news", async (req, res) => {
    try {
        const articles = await Article.find();
        res.json(articles);
    } catch (error) {
        res.status(500).json({ message: "Error fetching articles" });
    }
});

app.get("/", async (req, res) => {
    res.json({Message: "Server has been re-started"});
} )

// Use the message route for the contact form submission
app.use(messageRoute);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
