const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
    getAllConversations,
    getConversationById,
    deleteConversationById,
    clearAllConversations
} = require('../controllers/conversationController');

router.get('/conversations', authMiddleware, getAllConversations);

router.get('/conversations/:id', authMiddleware, getConversationById);

router.delete('/conversations/:id', authMiddleware, deleteConversationById);

router.delete('/conversations', authMiddleware, clearAllConversations);

// router.get('/conversations/search', authMiddleware, searchConversations);


module.exports = router;