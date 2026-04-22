const initAuthRoutes = require("./auth.routes");
const initCourseRoutes = require("./course.routes");
const initRoutes = (app) => {
    app.use("/api/auth",initAuthRoutes);
    app.use("/api/course",initCourseRoutes);
    return app.use("/",(req,res)=>{
        return res.status(404).json({
           error: 404,
              message: "Not Found API - API không tồn tại"
        })
    }) 
}

module.exports = {initRoutes};