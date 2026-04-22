const verifyRole = (...allowedRoles) => {
    return (req, res, next) => {
        try {
            if (!req.user) {
                return res.status(401).json({
                    error: 1,
                    message: "Chưa xác thực"
                });
            }

            if (!allowedRoles.includes(req.user.rolecode)) {
                return res.status(403).json({
                    error: 1,
                    message: "Không có quyền truy cập"
                });
            }

            next();
        } catch (error) {
            return res.status(500).json({
                error: 1,
                message: "Lỗi server nội bộ"
            });
        }
    };
};

module.exports = verifyRole;