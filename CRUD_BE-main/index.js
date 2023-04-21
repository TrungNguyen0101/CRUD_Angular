const express = require("express");
const app = express();
const jwt = require('jsonwebtoken');
require('dotenv').config()
const cors = require('cors')
var mongoose = require("mongoose");



//----------------- Connection mongodb
mongoose.connect(
    "mongodb+srv://trungnguyen010102hl:nguyenvip12@cluster0.siy1luu.mongodb.net/Crud",
    { useNewUrlParser: true },
    function check(err) {
        if (err) console.log(err);
        else console.log("Connection");
    }
);
//---------------  cho phép đọc yc http post put và định dạng dữ liệu đó  thành đối tượng js
app.use(express.json());
//---------------- Cho phép chia sẽ tài nguyên
app.use(cors())
//---------------- router
const routerUser = require('./routers/userRouter');
const routerAuth = require('./routers/authRouter');
app.use('/api/user', routerUser)
app.use('/api/auth', routerAuth)
const { check, checkRole } = require("./middlewares/checkRoleMW");
const { authenToken } = require("./middlewares/tokenMW");

// app.post('/api/login', (req, res) => {
//     const data = req.body;
//     const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60s' })
//     // const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET)
//     res.json({ accessToken })
// })
// app.post('/api/refreshToken', (req, res) => {
//     const refreshToken = req.body.token
//     if (!refreshToken) res.sendStatus(401)

// })
app.get("/api/book", function (req, res) {
    res.json({ status: 'Success', data: 123 });;
});

app.get("/", function (req, res) {
    res.send("Hello World");

});

app.listen(process.env.PORT, function check(err) {
    if (err) console.log("error server");
    console.log("Start server");

});
