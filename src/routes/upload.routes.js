const express = require('express');
const uploadController = require('../controllers/uploadController');
const { upload } = require('../middleware/uploadMiddleware');
const { verifyToken } = require('../middleware/index');
const validateApiKey = require('../middleware/apiKeyMiddleware');
const validatePlatform = require('../middleware/platformValidation');

const router = express.Router();

router.use(validateApiKey);
router.use(validatePlatform);

router.post('/file', 
    verifyToken, 
    upload.single('file'), 
    uploadController.uploadFile
);

module.exports = router;