// home/design-gpt-web/server/src/api/routes/promptRoutes.js
const express = require('express');
const router = express.Router();
const promptController = require('../controllers/promptController');

router.post('/', promptController.getPromptContent);

module.exports = router;