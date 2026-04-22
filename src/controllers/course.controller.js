const services = require("../services/course.service");

class CourseController {
    async registerCourse(req, res) {
        try {
            const responsive = await services.registerCourse(req.body);
            return res.status(200).json(responsive);
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                error: 500,
                message: "Interal Server Error"
            })
        }
    }

    async getCourseRegistrations(req, res) {
        try {
            const responsive = await services.getCourseRegistrations();
            return res.status(200).json(responsive);
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                error: 500,
                message: "Interal Server Error"
            })
        }
    }

    async getRegistrationById(req, res) {
        try {
            const { id } = req.params;
            const responsive = await services.getRegistrationById(id);
            return res.status(200).json(responsive);
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                error: 500,
                message: "Interal Server Error"
            })
        }
    }

    async deleteRegistration(req, res) {
        try {
            const { id } = req.params;
            const responsive = await services.deleteRegistration(id);
            return res.status(200).json(responsive);
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                error: 500,
                message: "Interal Server Error"
            })
        }
    }
}

module.exports = new CourseController();
