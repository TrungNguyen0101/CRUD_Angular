function checkRole(roles = []) {
    if (typeof roles === 'string') {
        roles = [roles];
    }
    return async (req, res, next) => {
        const { authorization } = req?.headers;
        console.log("🚀 ~ file: checkRoleMW.js:7 ~ return ~ authorization", authorization)
        try {
            if (!authorization) {
                return res.status(401).json("Chưa đăng nhập");
            }
            const token = authorization.split(' ')[1];
            const parseToken = parseJwt(token)
            console.log("🚀 ~ file: checkRoleMW.js:13 ~ return ~ parseToken", parseToken)
            // const user = await authServices.verifyJwt(authorization);
            // Allow other middleware to access the authenticated user detail
            if (roles.length && !roles.includes(parseToken.role)) {
                return res
                    .status(401)
                    .json("Không có quyền thực hiện");
            }
            return next();
        } catch (error) {
            return res.status(401).json("Lỗi");
        }
    };
}
function parseJwt(token) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}
module.exports = {
    checkRole
}