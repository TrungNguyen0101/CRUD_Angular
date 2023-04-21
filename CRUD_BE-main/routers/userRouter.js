const router = require('express').Router()
const userController = require('../controllers/userController')
const { userValidator } = require('../middlewares/validatorMW')
const { authenToken } = require('../middlewares/tokenMW')
const { checkRole } = require('../middlewares/checkRoleMW')


router.post('/createUser', authenToken, checkRole(["admin", "user"]), userValidator(), userController.createUser)
router.get('/findAllUser', authenToken, userController.findAllUser)
router.get('/findAllUserRestore', authenToken, userController.findAllUserRestore)
router.put('/updateUser/:userId', authenToken, checkRole(["admin", "user"]), userValidator(), userController.updateUser)
router.put('/deleteUser/:userId', authenToken, checkRole(["admin", "user"]), userController.deleteUser)
router.put('/restoreUser/:userId', authenToken, checkRole(["admin"]), userController.restoreUser)


module.exports = router