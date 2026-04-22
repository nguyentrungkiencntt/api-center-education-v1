const db = require("../models");

class CourseService {
    // Đăng kí khoá học
    registerCourse({ fullname, email, phone, codecourse, note }) {
        return new Promise(async (resolve, reject) => {
            try {
                // Validate dữ liệu đầu vào
                if (!fullname || !email || !phone || !codecourse) {
                    return resolve({
                        error: 1,
                        message: "Vui lòng điền đầy đủ thông tin bắt buộc"
                    });
                }

                // Kiểm tra email hợp lệ
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    return resolve({
                        error: 1,
                        message: "Email không hợp lệ"
                    });
                }

                // Kiểm tra số điện thoại hợp lệ
                const phoneRegex = /^[0-9]{10,11}$/;
                if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
                    return resolve({
                        error: 1,
                        message: "Số điện thoại không hợp lệ"
                    });
                }

                // Kiểm tra đã đăng kí khoá học này chưa
                const existingRegistration = await db.RegisterCourse.findOne({
                    where: { email, codecourse },
                    raw: true
                });

                if (existingRegistration) {
                    return resolve({
                        error: 1,
                        message: "Bạn đã đăng kí khoá học này rồi"
                    });
                }

                // Tạo mã đăng kí
                const codeEnrollment = `ENR${Date.now()}`;

                // Lưu vào database
                const responsive = await db.RegisterCourse.create({
                    codeenrollment: codeEnrollment,
                    fullname,
                    email,
                    phone,
                    codecourse,
                    note: note || null
                });

                return resolve({
                    error: 0,
                    message: "Đăng kí khoá học thành công. Cảm ơn quý khách hàng!",
                    data: {
                        codeenrollment: responsive.codeenrollment,
                        fullname: responsive.fullname,
                        email: responsive.email
                    }
                });
            } catch (error) {
                console.error("Error in registerCourse:", error);
                reject(error);
            }
        });
    }

    // Lấy danh sách tất cả đăng kí
    getCourseRegistrations() {
        return new Promise(async (resolve, reject) => {
            try {
                const responsive = await db.RegisterCourse.findAll({
                    raw: true,
                    order: [['createdAt', 'DESC']]
                });

                return resolve({
                    error: 0,
                    message: "Lấy dữ liệu thành công",
                    count: responsive.length,
                    data: responsive
                });
            } catch (error) {
                console.error("Error in getCourseRegistrations:", error);
                reject(error);
            }
        });
    }

    // Lấy thông tin đăng kí theo ID
    getRegistrationById(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const responsive = await db.RegisterCourse.findByPk(id, {
                    raw: true
                });

                if (!responsive) {
                    return resolve({
                        error: 1,
                        message: "Không tìm thấy thông tin đăng kí"
                    });
                }

                return resolve({
                    error: 0,
                    message: "Lấy dữ liệu thành công",
                    data: responsive
                });
            } catch (error) {
                console.error("Error in getRegistrationById:", error);
                reject(error);
            }
        });
    }

    // Xoá đăng kí
    deleteRegistration(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const registration = await db.RegisterCourse.findByPk(id);

                if (!registration) {
                    return resolve({
                        error: 1,
                        message: "Không tìm thấy thông tin đăng kí"
                    });
                }

                await registration.destroy();

                return resolve({
                    error: 0,
                    message: "Xoá thông tin đăng kí thành công"
                });
            } catch (error) {
                console.error("Error in deleteRegistration:", error);
                reject(error);
            }
        });
    }
}

module.exports = new CourseService();
