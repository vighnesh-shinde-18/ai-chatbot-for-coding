const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email: email });
    
        if (existingUser) {
            return res.status(409).json({ error: "email already exists" });
        }

        const saltRounds = parseInt(process.env.SALT) || 10;
        const hasedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new User({
            username,
            email,
            password: hasedPassword
        });



        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const reqUser = await User.findOne({ email });
        if (!reqUser) {
            return res.status(400).json({ message: "User not found" });
        }

        const isValidPassword = await bcrypt.compare(password, reqUser.password);
        if (!isValidPassword) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        const token = jwt.sign({ id: reqUser._id }, process.env.JWT_SECRET, { expiresIn: "24h" });

        res.status(200).json({
            token,
            user: {
                id: reqUser._id,
                username: reqUser.username,
                email: reqUser.email
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser
};
