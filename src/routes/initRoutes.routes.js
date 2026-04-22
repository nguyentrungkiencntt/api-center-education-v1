const initAuthRoutes = require("./auth.routes");
const initRoutes = (app) => {
    app.use("/api/auth",initAuthRoutes);
    return app.use("/",(req,res)=>{
        return res.status(404).json({
           error: 404,
              message: "Not Found API - API không tồn tại"
        })
    }) 
}

module.exports = {initRoutes};