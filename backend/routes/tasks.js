const express = require('express');
const taskController = require('./../controller/taskController');
const router = express.Router();

router.get('/', taskController.listTasks);

router.get('/:taskId', taskController.getTask);

router.post('/', taskController.createTask);

router.patch('/:taskId', taskController.updateTask);

router.delete('/:taskId', taskController.deleteTask);

module.exports = router;
