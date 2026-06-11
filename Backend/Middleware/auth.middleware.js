const jwt = require('jsonwebtoken');
const Blacklist = require('../Model/blacklist.model');


/**
 * @name Auth Middleware
 * @description Checks if the user is authenticated and authorized
 * @async
 * @throws {Error} If the user is not authenticated
 * @access Private
 */
const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "token is required" });
    }
    try {
        const blacklistedToken = await Blacklist.findOne({ token })
        if (blacklistedToken) {
            return res.status(401).json({ message: "token is blacklisted" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ message: "Invalid token" });
        }

        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError" || error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid or expired token" });
        }
        console.error("Error in auth middleware:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

/**
 * @name Optional Auth Middleware
 * @description Checks if the user is authenticated, but does not throw an error if not
 * @async
 * @access Public
 */
const optionalAuthMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        req.user = null;
        return next();
    }
    try {
        const blacklistedToken = await Blacklist.findOne({ token })
        if (blacklistedToken) {
            req.user = null;
            return next();
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        req.user = null;
        next();
    }
}

module.exports = { authMiddleware, optionalAuthMiddleware }