const express = require('express');
const { generateCode } = require('../controllers/aiControllers');
const authMiddleware = require('../middleware/authMiddleware')
const router = express.Router();

// authMiddleware
router.post('/generate',  generateCode);

module.exports = router;

 