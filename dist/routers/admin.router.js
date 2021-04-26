"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const admin_service_1 = require("../services/admin.service");
exports.userRouter = express_1.Router();
const userService = new admin_service_1.AdminService();
exports.userRouter.post('/register', (req, res) => {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty())
        return res.status(422).json(errors.array());
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;
    //const payload = matchedData({email, password, role}) as AdminAddModel
    const user = userService.register({ email, password, role });
    return user;
});
exports.userRouter.post('/login', (req, res) => {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty())
        return res.status(422).json(errors.array());
    const email = req.body.email;
    const password = "";
    const role = "";
    console.log(email);
    //const payload = matchedData({email}) as AdminAddModel
    const token = userService.login({ email, password, role });
    return token.then(t => res.json(t));
});
//# sourceMappingURL=admin.router.js.map