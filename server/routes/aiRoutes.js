const express = require('express');
const router = express.Router();
const { processAIRequest } = require('../controllers/aiControllers');

router.post('/ai',  processAIRequest);

module.exports = router;

 
