const router = require('express').Router()
const authController = require('../controllers/authController')
const { AuthRegisterValidator, AuthLoginValidator } = require('../middlewares/validatorMW')
// const { authenToken } = require('../middlewares/token')


router.post('/createAccount', AuthRegisterValidator(), authController.createAccount)
router.post('/loginAccount', AuthLoginValidator(), authController.loginAccount)
// router.post('/createAccount', authController.createAccount)



module.exports = router