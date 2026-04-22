require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                error: 1,
                message: "Token không tồn tại"
            });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key');
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                error: 1,
                message: "Token đã hết hạn"
            });
        }
        return res.status(401).json({
            error: 1,
            message: "Token không hợp lệ"
        });
    }
};

module.exports = verifyToken;