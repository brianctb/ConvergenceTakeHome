const Todo = require('../models/todo');

const getAllTodo = async (req, res) => {
    try {
        const todos = await Todo.find({});
        res.json(todos);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to get todos' });
    }
}

const createTodo = async (req, res) => {
    try {
        if (!req.body.title || !req.body.category || !req.body.description) {
            return res.status(400).json({ error: 'Missing fields' });
        }
        const newTodo = await Todo.create({
            title: req.body.title,
            category: req.body.category,
            description: req.body.description,
            publisher: req.session.user._id
        })
        await newTodo.save();
        res.json({message: 'Todo created successfully'});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to create todo' });
    }
}

const updateTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        } else {
            if (todo.publisher != req.session.user._id) {
                return res.status(401).json({ error: 'Not authorized' });
            }
            if (!req.body.title || !req.body.category || !req.body.description) {
                return res.status(400).json({ error: 'Missing fields' });
            }
            todo.title = req.body.title;
            todo.category = req.body.category;
            todo.description = req.body.description;
            await todo.save();
            res.json({message: 'Todo updated successfully'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to update todo' });
    }
}

const deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        } else {
            if (todo.publisher != req.session.user._id) {
                return res.status(401).json({ error: 'Not authorized' });
            }
            await todo.deleteOne();
            res.json({message: 'Todo deleted successfully'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to delete todo' });
    }
}

module.exports = {
    getAllTodo,
    createTodo,
    updateTodo,
    deleteTodo
}