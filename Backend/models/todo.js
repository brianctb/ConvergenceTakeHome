const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        publisher: {
            type: String,
            required: true
        }
    }
)

const Todo = mongoose.model('Todo', schema);

module.exports = Todo;
