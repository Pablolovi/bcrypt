const express = require('express');
const bcrypt = require('bcrypt');
const { generateToken, verifyToken } = require('../middlewares/authMiddleware');
const users = require('../data/users');

const router = express.Router();

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).send('credenciales inválidas');
    }

    const token = generateToken(user);
    res.json({ token });
});

router.get('/dashboard', verifyToken, (req, res) => {
    req.user = null;
    res.send('Logged out successfully');
});

module.exports = router;