const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            minlength: 8
        }
    }
)

const User = mongoose.model('User', schema);

module.exports = User;
