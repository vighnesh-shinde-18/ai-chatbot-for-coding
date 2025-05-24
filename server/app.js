const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const aiRoutes = require("./routes/aiRoutes");
const userRoutes = require("./routes/userRoutes");
const conversationRoutes = require("./routes/conversationRoutes");
const db = require("./config/db");

dotenv.config();

const app = express();

const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

const helmet = require('helmet'); 
  
app.use(helmet());  
 

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser())
app.use(express.json({ limit: "10kb" }));  // limit request size
;

const PORT = process.env.PORT || 5000;



// Routes
app.get("/", (req, res) => {
  res.send("Server is working!");
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/ai/conversations", conversationRoutes);  // Corrected typo: convertations ➔ conversations

 
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
