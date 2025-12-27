const jwt = require('jsonwebtoken');

const authmiddleware = (req, res, next) => {
    const AuthHeader = req.headers.authorization;

    if (!AuthHeader || !AuthHeader.startswith('Bearer')) {
        return res.status(404).json({ message: "No Token Provided" });
    }

    const token = AuthHeader.split( " ")[1];

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token In auth.js" });
    }
}

module.exports = authmiddleware;