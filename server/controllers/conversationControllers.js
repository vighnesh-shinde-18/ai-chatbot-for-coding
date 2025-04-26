const Conversation = require('../models/conversationModel');


const getAllConversations = async (req, res) => {
    try {
        const { featureType } = req.body;
        const userId = req.user.id;
        
        const query = { userId };

        if (featureType) {
            query.featureType = featureType;
        }

        const conversations = await Conversation.find(query).sort({ createdAt: -1 }).lean();

        res.status(200).json(conversations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getConversationById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const conversation = await Conversation.findOne({
            _id: id,
            userId: userId
        }).lean();

        if (!conversation) {
            return res.status(404).json({ message: "Conversation not found" });
        }

        res.status(200).json(conversation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const saveConversation = async (userId, featureType, userInput, aiResponse) => {
    try {

        if (!featureType || !userInput || !aiResponse) {
            return res.status(400).json({ message: "Missing required conversation data" });
        }

        const newConversation = new Conversation({
            userId,
            featureType,
            userInput,
            aiOutput: aiResponse,
            timestamp: new Date()
        });

        await newConversation.save();

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const deleteConversationById = async (req, res) => {
    try {
        const { id } = req.body;
        const userId = req.user.id;

        const result = await Conversation.findOneAndDelete({
            _id: id,
            userId: userId
        }).lean();

        if (!result) {
            return res.status(404).json({ message: "Conversation not found" });
        }

        res.status(200).json({ message: "Conversation deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const clearAllConversations = async (req, res) => {
    try {
        const { featureType } = req.body;
        const userId = req.user.id;

        const query = { userId };

        if (featureType) {
            query.featureType = featureType;
        }

        const result = await Conversation.deleteMany(query).lean();

        res.status(200).json({
            message: "Conversations cleared successfully",
            count: result.deletedCount
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// const searchConversations = async (req, res) => {
//     try {
//         const { query } = req.query;
//         const userId = req.user.id;

//         if (!query) {
//             return res.status(400).json({ message: "Search query is required" });
//         }

//         const conversations = await Conversation.find({
//             userId: userId,
//             $or: [
//                 { userInput: { $regex: query, $options: 'i' } },
//                 { aiOutput: { $regex: query, $options: 'i' } }
//             ]
//         }).sort({ createdAt: -1 });

//         res.status(200).json(conversations);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

module.exports = {
    getAllConversations,
    getConversationById,
    saveConversation,
    deleteConversationById,
    clearAllConversations
};