
const { check, validationResult } = require('express-validator');
const User = require('../models/user');
const bcrypt = require("bcrypt");
const Account = require('../models/account');
const userValidator = () => {
    return [
        check('phone')
            .notEmpty()
            .withMessage("Vui lòng điền đầy đủ thông tin")
            .custom(value => {
                return User.findOne({ phone: value }).then(user => {
                    if (user) {
                        return Promise.reject('Số điện thoại đã tồn tại');
                    }
                });
            }),
        check('address')
            .notEmpty()
            .withMessage("Vui lòng điền đầy đủ thông tin"),
        check('name')
            .notEmpty()
            .withMessage("Vui lòng điền đầy đủ thông tin"),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json(errors.array());
            }
            next();
        }
    ];
}
const AuthRegisterValidator = () => {
    return [
        check('username')
            .notEmpty()
            .withMessage("Vui lòng điền đầy đủ thông tin")
            .custom(value => {
                return Account.findOne({ username: value }).then(account => {
                    if (account) {
                        return Promise.reject('Tài khoản đã tồn tại');
                    }

                });
            }),
        check('password')
            .notEmpty()
            .withMessage("Vui lòng điền đầy đủ thông tin"),
        check('confirmPassword')
            .notEmpty()
            .withMessage("Vui lòng điền đẩy đủ thông tin")
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error('Mật khẩu xác thực không trùng');
                }
                return true;

            }),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json(errors.array());
            }
            next();
        }
    ];
}
const AuthLoginValidator = () => {
    return [
        check('username')
            .notEmpty()
            .withMessage("Vui lòng điền đầy đủ thông tin")
        ,
        check('password')
            .notEmpty()
            .withMessage("Vui lòng điền đầy đủ thông tin"),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json(errors.array());
            }
            next();
        }
    ];
}
module.exports = {
    userValidator,
    AuthRegisterValidator,
    AuthLoginValidator
}