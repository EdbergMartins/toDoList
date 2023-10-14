const express = require('express')
const tasksControler = require('./controles/tasksController')
const tasksMiddleware = require('./middlewares/tasksMiddlewares')
const registerController = require('./controles/registerController')
const singInUsersController = require('./controles/singInUsersController')
const loginValidateMiddlewares = require('./middlewares/loginValidateMiddlewares')

const router = express.Router();

router.get('/tasks', [loginValidateMiddlewares.verificaToken, loginValidateMiddlewares.verificaToken], tasksControler.getAll)
router.post('/tasks', [loginValidateMiddlewares.verificaToken, tasksMiddleware.validateBody], tasksControler.createTask)
router.delete('/tasks', [loginValidateMiddlewares.verificaToken, tasksMiddleware.validateDelite], tasksControler.deleteTask)
router.patch('/tasks', loginValidateMiddlewares.verificaToken, tasksControler.atualizeStatusTask)
router.post('/register', registerController.registerUser)
router.get('/register', registerController.getUsers)
router.post('/login', singInUsersController.singInUsers)


module.exports = router;
