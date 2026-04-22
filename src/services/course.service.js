const db = require("../models");


class CourseService {
    courseDetail(codecourse) {
        return new Promise(async (reslove, reject) => {
            try {
               const course = await db.Course.findOne({
                where:{codecourse},
                raw:true
               })
               return reslove({
                error: course ? 1 : 0,
                message: course ? "Course found" : "Course not found",
                data: course ? course : {}
               })              
            } catch (error) {
                reject(error);
            }
        })
    }

   
}

module.exports = new CourseService();