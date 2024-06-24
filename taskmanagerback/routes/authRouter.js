//routes/authRouter.js

var express = require('express');
var router = express.Router();

router.use(express.json());

const authController = require('../controllers/authController');

router.post('/login', async(req,res) => authController.login(req, res));

module.exports = router;