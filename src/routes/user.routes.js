const express = require('express');
const router = express.Router();
// const md5 = require('md5')


const UserController = require('../controller/user.controller')
router.get('/', UserController.getUser);
router.post('/login', UserController.login);
router.post('/create', UserController.createUser)
router.delete('/delete/:id', UserController.deleteUser)


module.exports = router;