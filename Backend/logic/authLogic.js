const User = require('../models/user');
const bcrypt = require('bcrypt');

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: 'Invalid username' });
        } else {
            const valid = await bcrypt.compare(password, user.password);
            if (!valid) {
                return res.status(400).json({ error: 'Invalid password' });
            } else {
                req.session.user = user;
                res.json({ message: 'Login successful' });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Login failed' });
    }
}

const checkLogin = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.status(401).json({ error: 'Not logged in' });
    }
}

module.exports = {
    login,
    checkLogin
}