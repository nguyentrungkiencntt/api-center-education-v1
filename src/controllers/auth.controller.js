const services = require("../services/auth.service");

class AuthController {
  async register(req, res) {
    try {
      const result = await services.register(req.body);
      const statusCode = result.error === 0 ? 201 : 400;
      return res.status(statusCode).json(result);
    } catch (error) {
      console.error("Register error:", error);
      return res.status(500).json({
        error: 1,
        message: "Lỗi server nội bộ"
      });
    }
  }

  async login(req, res) {
    try {
      const result = await services.login(req.body);
      const statusCode = result.error === 0 ? 200 : 401;
      return res.status(statusCode).json(result);
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({
        error: 1,
        message: "Lỗi server nội bộ"
      });
    }
  }
}

module.exports = new AuthController();