const jwt = require('jsonwebtoken');

const authmiddleware = (req, res, next) => {

    if (req.method === "OPTIONS") {
        return next();
    }
    const authHeader = req.headers.authorization;

    // console.log("AUTH HEADER:", authHeader); // debug


    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(404).json({ message: "No Token Provided" });
    }

    const token = authHeader.split(" ")[1];
    // console.log("token is ",token);

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();

    } catch (error) {
        return res.status(401).json({ message: "Invalid token In auth.js" });
    }
}

module.exports = authmiddleware;