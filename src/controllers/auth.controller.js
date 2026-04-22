const services = require("../services/auth.service");
class AuthController {
  async register(req, res) {
    try {
      const responsive = await services.register(req.body);
      return res.status(200).json(responsive);
    } catch (error) {
      return res.status(500).json({
        error: 500,
        message: "Interal Server Error"
      })
    }
  }

  async login(req, res) {
    try {
      const responsive = await services.login(req.body);
      return res.status(200).json(responsive);
    } catch (error) {
      return res.status(500).json({
        error: 500,
        message: "Interal Server Error"
      })
    }
  }
}


module.exports = new AuthController();