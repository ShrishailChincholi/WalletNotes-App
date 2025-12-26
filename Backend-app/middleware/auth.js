const jwt = require('jsonwebtoken');

const authmiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(404).json({ message: "No Token Provided" });
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token In auth.js" });
    }
}

module.exports = authmiddleware;