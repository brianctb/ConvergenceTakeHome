const express = require('express');
const router = express.Router();
const todoLogic = require('../logic/todoLogic');
const authLogic = require('../logic/authLogic');

router.get('/todos', todoLogic.getAllTodo);
router.post('/createtodo', authLogic.checkLogin, todoLogic.createTodo);
router.put('/updatetodo/:id', authLogic.checkLogin, todoLogic.updateTodo);
router.delete('/deletetodo/:id', authLogic.checkLogin, todoLogic.deleteTodo);

module.exports = router;