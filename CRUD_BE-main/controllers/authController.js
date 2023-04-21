const authService = require('../services/authService')
const { validationResult } = require('express-validator')

const createAccount = async (req, res) => {
    try {
        let account = await authService.createAccountService(req.body)
        console.log(account);
        return res.status(200).json(account)
    } catch (error) {
        return res.status(500).json(error)
    }
}
const loginAccount = async (req, res) => {
    try {
        let account = await authService.loginAccountService(req.body)
        return res.status(200).json(account)
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = {
    createAccount,
    loginAccount
}