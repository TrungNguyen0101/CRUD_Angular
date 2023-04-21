const userService = require('../services/userService')
const { validationResult } = require('express-validator')
const createUser = async (req, res) => {
    try {

        let user = await userService.createUserService(req.body)
        console.log(user);
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json(error)
    }
}
const updateUser = async (req, res) => {
    try {
        let { userId } = req.params
        let user = await userService.updateUserService(userId, req.body)
        // console.log(user);
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json(error)
    }
}
const deleteUser = async (req, res) => {
    try {
        let { userId } = req.params
        let user = await userService.deleteUserService(userId, req.body)
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json(error)
    }
}
const restoreUser = async (req, res) => {
    try {
        let { userId } = req.params
        let user = await userService.restoreUserService(userId, req.body)
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json(error)
    }
}
const findAllUser = async (req, res) => {
    try {
        let user = await userService.findAllUserService()
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json(error)
    }
}
const findAllUserRestore = async (req, res) => {
    try {
        let user = await userService.findAllUserRestoreService()
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = {
    createUser,
    findAllUser,
    updateUser,
    deleteUser,
    restoreUser,
    findAllUserRestore

}