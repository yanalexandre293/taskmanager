//routes/userRouter.js

var express = require('express');
var router = express.Router();

router.use(express.json());

const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/create', authenticateToken, async(req,res) => userController.createUser(req, res));
router.get('/getAll', authenticateToken, async(req,res) => userController.getAllUsers(req, res));
router.get('/get/:email', authenticateToken, async(req,res) => userController.getUserByEmail(req, res));
router.delete('/delete', authenticateToken, async(req,res) => userController.deleteUser(req, res));
router.put('/update', authenticateToken, async(req,res) => userController.updateUser(req, res));

module.exports = router;