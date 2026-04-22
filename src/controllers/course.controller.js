const services = require("../services/course.service");
class CourseController {
  async course(req, res) {
    try {
      const responsive = await services.courseDetail(req.params.codecourse);
      return res.status(200).json(responsive);
    } catch (error) {
      return res.status(500).json({
        error: 500,
        message: "Interal Server Error"
      })
    }
  }

}


module.exports = new CourseController();