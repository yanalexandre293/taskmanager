//routes/taskRouter.js

var express = require('express');
var router = express.Router();

router.use(express.json());

const taskController = require('../controllers/taskController');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/create', authenticateToken, async(req,res) => taskController.createUser(req, res));
router.get('/getAll', authenticateToken, async(req,res) => taskController.getAllTasks(req, res));
router.get('/get/:id', authenticateToken, async(req,res) => taskController.getTaskById(req, res));
router.delete('/delete/:id', authenticateToken, async(req,res) => taskController.deleteTask(req, res));
router.put('/update', authenticateToken, async(req,res) => taskController.updateTask(req, res));

module.exports = router;