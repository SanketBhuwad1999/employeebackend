const express = require('express');
const router = express.Router();

const PasswordController = require('../controller/forgotpassword.controller')

// router.post('/', PasswordController.sendMail);
router.post('/update', PasswordController.updateUser);
router.put('/updatepassword', PasswordController.updatepassword);


module.exports = router;