const jwt = require('jsonwebtoken');
const { hashedSecret } = require('../crypto/config');

function generateToken(user) {
    return jwt.sign({ id: user.id, username: user.username }, hashedSecret, { expiresIn: '1h' });
}

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send('Token is required');

    jwt.verify(token, hashedSecret, (err, decoded) => {
        if (err) return res.staus(401).send('Invalid token');
        req.user = decoded;
        next();
    });
}

module.exports = { generateToken, verifyToken };