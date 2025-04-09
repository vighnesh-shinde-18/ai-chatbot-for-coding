const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes')
const aiRoutes = require("./routes/aiRoutes")
const db = require('./config/db')

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Server is working!');
})

app.use("/user/auth", authRoutes);

app.use('/ai', aiRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})



