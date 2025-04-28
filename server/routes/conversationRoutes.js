const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  getAllConversations,
  getConversationById,
  deleteConversationById,
  clearAllConversations,
} = require("../controllers/conversationControllers");

router.get("/", authMiddleware, getAllConversations);
router.get("/:id", authMiddleware, getConversationById);
router.delete("/:id", authMiddleware, deleteConversationById);
router.delete("/", authMiddleware, clearAllConversations);

module.exports = router;
