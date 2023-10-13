const express = require('express')
const tasksControler = require('./controles/tasksController')
const tasksMiddleware = require('./middlewares/tasksMiddlewares')
const registerController = require('./controles/registerController')

const router = express.Router();

router.get('/tasks', tasksControler.getAll)
router.post('/tasks',tasksMiddleware.validateBody,tasksControler.createTask)
router.delete('/tasks', tasksMiddleware.validateDelite, tasksControler.deleteTask)
router.patch('/tasks', tasksControler.atualizeStatusTask)
router.post('/register', registerController.registerUser)
router.get('/register', registerController.getUsers)


module.exports = router;
