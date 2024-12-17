// home/design-gpt-web/server/src/api/routes/methodRoutes.js
const express = require('express');
const router = express.Router();
const methodController = require('../controllers/methodController');

router.get('/:id', methodController.getMethodById);

module.exports = router;