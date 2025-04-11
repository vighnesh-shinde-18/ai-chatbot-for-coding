const express = require('express');
const router = express.Router();
const { processAIRequest } = require('../controllers/aiControllers');
 
const authMiddleware = require('../middleware/authMiddleware')

router.post('/api',  authMiddleware,processAIRequest);

module.exports = router;
