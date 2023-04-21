const Account = require('../models/account')
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const createAccountService = async (body) => {
    const info = {
        username: body.username,
        password: await bcrypt.hash(body.password, 10),
        role: body.role,
    }
    const result = await Account.create(info)
    return { result, message: "success" }
}
const loginAccountService = async (body) => {
    const { username, password } = body;
    const account = await Account.findOne({ username: username })
    if (account) {
        const dataToken = {
            username,
            role: account.role
        }

        const checkPassword = await bcrypt.compare(password, account.password)
        if (checkPassword) {
            const accessToken = await jwt.sign(dataToken, process.env.ACCESS_TOKEN_SECRET)
            return { token: accessToken, message: "Đăng nhập thành công" }
        }
        else
            return { message: "Mật khẩu không chính xác" }

    }
    else {

        return { message: "Tài khoản không tồn tại." }
    }
}
module.exports = {
    createAccountService,
    loginAccountService
};