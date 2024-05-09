const express = require('express');
const router = express.Router();
const promptController = require('../controllers/promptController');

router.post('/', promptController.getPromptContent);

module.exports = router;