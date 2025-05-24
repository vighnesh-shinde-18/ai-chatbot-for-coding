const express = require("express");
const router = express.Router();
const { processAIRequest } = require("../controllers/aiControllers");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/generate",authMiddleware, processAIRequest);

module.exports = router;
