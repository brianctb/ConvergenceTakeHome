const Todo = require('../models/todo');

const getAllTodo = async (req, res) => {
    try {
        let todos;
        if(req.query.title || req.query.category || req.query.description) {
            query = {};
            if(req.query.title) {
                query.title = req.query.title
            }
            if(req.query.category) {
                query.category = req.query.category
            }
            if(req.query.description) {
                query.description = req.query.description
            }
            todos = await Todo.find(query);
        } else {
            todos = await Todo.find({});
        };
        res.json(todos)
    } catch (error) {
        console.log(error);
        res.status(500).send('Failed to get todos');
    }
}

const createTodo = async (req, res) => {
    try {
        if (!req.body.title || !req.body.category || !req.body.description) {
            return res.status(400).send('Missing fields');
        }
        const newTodo = await Todo.create({
            title: req.body.title,
            category: req.body.category,
            description: req.body.description,
            publisher: req.session.user._id
        })
        await newTodo.save();
        res.send('Todo created successfully');
    } catch (error) {
        console.log(error);
        res.status(500).send('Failed to create todo');
    }
}

const updateTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).send('Todo not found');
        }
        if (todo.publisher != req.session.user._id) {
            return res.status(401).send('Not authorized');
        }
        if (!req.body.title || !req.body.category || !req.body.description) {
            return res.status(400).send('Missing fields');
        }
        todo.title = req.body.title;
        todo.category = req.body.category;
        todo.description = req.body.description;
        await todo.save();
        res.send('Todo updated successfully');

    } catch (error) {
        console.log(error);
        res.status(500).send('Failed to update todo');
    }
}

const deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).send('Todo not found' );
        } 
        if (todo.publisher != req.session.user._id) {
            return res.status(401).send('Not authorized');
        }
        await todo.deleteOne();
        res.send('Todo deleted successfully');
    } catch (error) {
        console.log(error);
        res.status(500).send('Failed to delete todo');
    }
}

module.exports = {
    getAllTodo,
    createTodo,
    updateTodo,
    deleteTodo
}