const db = require("../models");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// const hashPass = (pass) = bcrypt.hashSync(pass, bcrypt.genSaltSync(12));

class AuthService {
    register({ username, phone, password, role }) {
        return new Promise(async (reslove, reject) => {
            try {

                // const userId = `SD${Date.now()}`;

                // const responsive = await db.User.findOrCreate({
                //     where: { phone },
                //     defaults: {
                //         phone,
                //         password: hashPass(password),
                //         username,
                //         codeuser: userId,
                //         rolecode: role ? role : "R3"
                //     }
                // })

                // return reslove({
                //     error: responsive[1] ? 0 : 1,
                //     message: responsive[1] ? "Đăng ký tài khoản thành công. Cảm ơn quý khách hàng !" : "Đăng ký không thành công."
                // })
            } catch (error) {
                reject(error);
            }
        })
    }

    login({ phone, password }) {
        return new Promise(async (reslove, reject) => {
            try {

                const responsive = await db.User.findOne({
                    where: { phone },
                    raw: true,

                })

                const isPassValid = responsive && checkPass(password, responsive?.password);
                const token = isPassValid ? jwt.sign({ id: responsive?.id, phone: responsive?.phone, codeuser: responsive?.codeuser }, process.env.JWT_SECRET, { expiresIn: '2d' }) : null;

                return reslove({
                    error: token ? 0 : 1,
                    message: token ? "Đăng nhập tài khoản thành công." : responsive ? "Sai mật khẩu !" : "Tài khoản chưa được đăng ký !",
                    access_token: token,
                    role: token ? responsive?.rolecode : null
                })

            } catch (error) {
                reject(error);
            }
        })
    }

}

module.exports = new AuthService();