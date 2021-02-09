var express = require('express');
var router = express.Router();
const path = require('path')

const {login,processLogin,processRegister,register,profile} = require/* (path.join('..','controllers','usersController')) */('../controllers/usersController')

/* Middlewares */
const uploadAvatar = require('../middlewares/uploadAvatar')

router.get('/register',register);
router.post('/register',uploadAvatar.any(), processRegister);
router.get('/login',login);
router.post('/login',processLogin);
router.get('/profile',profile);

module.exports = router;
