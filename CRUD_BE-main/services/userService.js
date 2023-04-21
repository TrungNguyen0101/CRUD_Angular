const user = require('../models/user')
const createUserService = async (body) => {
    console.log(body);
    const info = {
        name: body.name,
        address: body.address,
        phone: body.phone,
    }
    const result = await user.create(info)
    return { result, message: "success" }
}
const updateUserService = async (userId, body) => {
    // const { userID } = req.params;
    console.log(body);
    const info = {
        name: body.name,
        address: body.address,
        phone: body.phone,
    }
    const result = await user.updateOne(
        { _id: userId },
        { $set: info }
    );
    return { result, message: "success" }
}
const deleteUserService = async (userId, body) => {
    const info = {
        checkDelete: body.checkDelete
    }
    const result = await user.updateOne(
        { _id: userId },
        { $set: info }
    );
    return { result, message: "success" }
}
const restoreUserService = async (userId, body) => {
    const info = {
        checkDelete: body.checkDelete
    }
    const result = await user.updateOne(
        { _id: userId },
        { $set: info }
    );
    return { result, message: "success" }
}
const findAllUserService = async () => {
    const result = await user.find({ checkDelete: false })
    return { result, message: "success" }
}
const findAllUserRestoreService = async () => {
    const result = await user.find({ checkDelete: true })
    return { result, message: "success" }
}

module.exports = {
    createUserService,
    findAllUserService,
    updateUserService,
    deleteUserService,
    restoreUserService,
    findAllUserRestoreService
};