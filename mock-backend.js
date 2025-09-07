const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Backend is running" });
});

// Mock authentication endpoints
app.post("/api/auth/register", (req, res) => {
  const { email, password, confirmPassword } = req.body;

  // Basic validation
  if (!email || !password || !confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Passwords do not match",
    });
  }

  // Mock successful registration
  res.status(201).json({
    success: true,
    message: "User registered successfully",
    user: {
      id: "mock-user-id",
      email: email,
      createdAt: new Date().toISOString(),
    },
  });
});

app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  // Mock successful login
  res.json({
    success: true,
    message: "Login successful",
    user: {
      id: "mock-user-id",
      email: email,
      createdAt: new Date().toISOString(),
    },
    token: "mock-jwt-token-" + Date.now(),
  });
});

app.get("/api/auth/verify", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "No token provided",
    });
  }

  // Mock successful verification
  res.json({
    success: true,
    message: "Token is valid",
    user: {
      id: "mock-user-id",
      email: "user@example.com",
      createdAt: new Date().toISOString(),
    },
  });
});

app.post("/api/auth/logout", (req, res) => {
  res.json({
    success: true,
    message: "Logged out successfully",
  });
});

// Mock mood analytics endpoint
app.get("/api/mood/analytics", (req, res) => {
  res.json({
    success: true,
    data: {
      averageMood: 7.2,
      moodTrend: "improving",
      weeklyData: [
        { date: "2025-01-01", mood: 6 },
        { date: "2025-01-02", mood: 7 },
        { date: "2025-01-03", mood: 8 },
        { date: "2025-01-04", mood: 7 },
        { date: "2025-01-05", mood: 8 },
        { date: "2025-01-06", mood: 7 },
        { date: "2025-01-07", mood: 8 },
      ],
      emotionFrequency: [
        { emotion: "Happy", count: 12 },
        { emotion: "Calm", count: 8 },
        { emotion: "Excited", count: 5 },
        { emotion: "Anxious", count: 3 },
      ],
    },
  });
});

// Mock journal analytics endpoint
app.get("/api/journal/analytics", (req, res) => {
  res.json({
    success: true,
    data: {
      totalEntries: 15,
      averageLength: 245,
      sentimentDistribution: [
        { label: "positive", count: 8 },
        { label: "neutral", count: 5 },
        { label: "negative", count: 2 },
      ],
      commonThemes: [
        { theme: "gratitude", frequency: 6 },
        { theme: "work stress", frequency: 4 },
        { theme: "relationships", frequency: 3 },
      ],
      weeklySummary:
        "This week you've been focusing on gratitude and managing work stress. Your journal entries show a positive trend in emotional awareness.",
    },
  });
});

// Mock mood entries endpoint
app.get("/api/mood/entries", (req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: "1",
        mood: 8,
        emotions: ["Happy", "Grateful"],
        notes: "Had a great day with friends",
        timestamp: "2025-01-07T10:00:00Z",
      },
      {
        id: "2",
        mood: 7,
        emotions: ["Calm", "Content"],
        notes: "Peaceful morning meditation",
        timestamp: "2025-01-06T09:00:00Z",
      },
    ],
    pagination: {
      page: 1,
      limit: 10,
      total: 2,
      totalPages: 1,
    },
  });
});

// Mock journal entries endpoint
app.get("/api/journal/entries", (req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: "1",
        content:
          "Today I'm grateful for the beautiful weather and the time I spent with my family. It reminded me of what's truly important in life.",
        timestamp: "2025-01-07T20:00:00Z",
        mood: 8,
        tags: ["gratitude", "family"],
      },
      {
        id: "2",
        content:
          "Work was challenging today, but I learned something new about myself. I can handle stress better than I thought.",
        timestamp: "2025-01-06T19:00:00Z",
        mood: 6,
        tags: ["work", "growth"],
      },
    ],
    pagination: {
      page: 1,
      limit: 10,
      total: 2,
      totalPages: 1,
    },
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Mock backend server running on http://localhost:${PORT}`);
  console.log(`📋 Available endpoints:`);
  console.log(`   GET  /api/health`);
  console.log(`   POST /api/auth/register`);
  console.log(`   POST /api/auth/login`);
  console.log(`   GET  /api/auth/verify`);
  console.log(`   POST /api/auth/logout`);
  console.log(`   GET  /api/mood/analytics`);
  console.log(`   GET  /api/mood/entries`);
  console.log(`   GET  /api/journal/analytics`);
  console.log(`   GET  /api/journal/entries`);
  console.log(
    `\n✨ Your frontend should now work with full dashboard content!`
  );
});
