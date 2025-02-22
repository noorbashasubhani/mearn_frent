const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multerConfig');
const libdataController = require('../controllers/libdataController');

router.post('/Library', upload.single('libra_pdf'), libdataController.createLibdata);
router.get('/Library-Details',libdataController.getAllLibdata);

module.exports = router;
