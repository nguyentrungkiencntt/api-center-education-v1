const db = require("../models");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

class AuthService {
    hashPassword(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    }

    comparePassword(password, hash) {
        return bcrypt.compareSync(password, hash);
    }
    generateToken(user) {
        return jwt.sign(
            { 
                id: user.id, 
                phone: user.phone, 
                codeuser: user.codeuser,
                rolecode: user.rolecode 
            },
            process.env.JWT_SECRET || 'your_secret_key',
            { expiresIn: '7d' }
        );
    }

    register({ fullname, email, phone, password, username }) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!phone || !password) {
                    return resolve({
                        error: 1,
                        message: "Số điện thoại và mật khẩu không được để trống !"
                    });
                }
                const existingUser = await db.User.findOne({
                    where: { phone }
                });

                if (existingUser) {
                    return resolve({
                        error: 1,
                        message: "Số điện thoại đã tồn tại !"
                    });
                }
                const userId = `U${Date.now()}`;

                const hashedPassword = this.hashPassword(password);


                const newUser = await db.User.create({
                    codeuser: userId,
                    fullname: fullname || username || "User",
                    email: email,
                    phone: phone,
                    password: hashedPassword,
                    rolecode: "R3" 
                });

                return resolve({
                    error: 0,
                    message: "Đăng ký tài khoản thành công. Cảm ơn quý khách hàng !",
                    user: {
                        id: newUser.id,
                        codeuser: newUser.codeuser,
                        phone: newUser.phone,
                        fullname: newUser.fullname
                    }
                });

            } catch (error) {
                reject(error);
            }
        });
    }

    login({ phone, password }) {
        return new Promise(async (resolve, reject) => {
            try {
                
                if (!phone || !password) {
                    return resolve({
                        error: 1,
                        message: "Số điện thoại và mật khẩu không được để trống !"
                    });
                }
                const user = await db.User.findOne({
                    where: { phone },
                    raw: true
                });

                if (!user) {
                    return resolve({
                        error: 1,
                        message: "Tài khoản chưa được đăng ký !"
                    });
                }

                const isPasswordValid = this.comparePassword(password, user.password);

                if (!isPasswordValid) {
                    return resolve({
                        error: 1,
                        message: "Sai mật khẩu !"
                    });
                }

                const token = this.generateToken(user);

                return resolve({
                    error: 0,
                    message: "Đăng nhập tài khoản thành công.",
                    access_token: token,
                    user: {
                        id: user.id,
                        codeuser: user.codeuser,
                        phone: user.phone,
                        fullname: user.fullname,
                        email: user.email,
                        rolecode: user.rolecode
                    }
                });

            } catch (error) {
                reject(error);
            }
        });
    }
}

module.exports = new AuthService();