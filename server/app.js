const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes')
const aiRoutes = require("./routes/aiRoutes")
const userRoutes = require("./routes/userRoutes")
const db = require('./config/db')
const cookieParser = require('cookie-parser');
dotenv.config();

const app = express();

const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));


app.use(express.json());

app.use(cookieParser());



const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Server is working!');
})

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes)
app.use('/api/ai', aiRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
  });
  

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})