const express = require("express");
const router = express.Router();
const { returnUserProfileInfo, returnUserConversations } = require("../controllers/userControllers");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/profile", authMiddleware, returnUserProfileInfo);
router.get("/conversations", authMiddleware, returnUserConversations);

module.exports = router;
