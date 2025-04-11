
 
const express = require('express');
const router = express.Router();
const { accessUserInfo } = require('../controllers/userControllers');
 
const authMiddleware = require('../middleware/authMiddleware')

router.get('/info',  authMiddleware,accessUserInfo);

module.exports = router;
