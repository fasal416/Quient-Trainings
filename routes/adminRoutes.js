const express = require('express');

const adminControllers = require('../controllers/adminControllers');

const router = express.Router();

router.get('/', adminControllers.getAdmin);

router.post('/delete-msg/:id', adminControllers.postDeleteMessage);


module.exports = router;