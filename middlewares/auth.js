const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'you are not authorize' });
    }
    try {
        const decoded = jwt.verify(token, "masai");
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }
};

module.exports = { authMiddleware };