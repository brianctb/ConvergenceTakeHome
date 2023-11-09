const User = require('../models/user');
const bcrypt = require('bcrypt');

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).send('Invalid username');
        } else {
            const valid = await bcrypt.compare(password, user.password);
            if (!valid) {
                return res.status(400).send('Invalid password');
            } else {
                req.session.user = user;
                res.send('Login successful');
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Login failed');
    }
}

const checkLogin = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.status(401).send('Not logged in');
    }
}

module.exports = {
    login,
    checkLogin
}
