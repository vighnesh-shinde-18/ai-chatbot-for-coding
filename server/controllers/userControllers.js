const User = require('../models/userModel');
const Convertation = require('../models/conversationModel');
require('dotenv').config();

const returnUserProfileInfo = async (req, res) => {
    try {
        const { email } = req.body;

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(409).json({ error: "Email does not exist" });
        }

        res.status(200).json({
            email: existingUser.email,
            username: existingUser.username,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const returnUserConvertations = async (req, res) => {
    try {
        const { email } = req.body;

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(409).json({ error: "Email does not exist" });
        }

        const allConversations = await Convertation.find({ userId: existingUser._id }).sort({ createdAt: -1 });

        res.status(200).json({
            conversations: allConversations,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    returnUserProfileInfo,
    returnUserConvertations,
};
