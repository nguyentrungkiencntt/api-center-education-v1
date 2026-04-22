const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const {initRoutes} = require("./routes/initRoutes.routes");
const {connect} = require("./config/connect.config");

connect();
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
initRoutes(app);

app.listen(port,()=>{
   console.log("App listening on port " + port);
});