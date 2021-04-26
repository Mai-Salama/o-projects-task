"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = __importStar(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
const admins_1 = require("../models/admins");
class AdminService {
    constructor() {
        this._saltRounds = 12;
        this._jwtSecret = 'jwtSecret';
    }
    static get adminAttributes() {
        return ['id', 'email', 'role'];
    }
    static get admin() {
        return AdminService._admin;
    }
    register({ email, password, role }) {
        console.log("got into register AdminService");
        console.log({ email, password, role });
        bcrypt.hash(password, this._saltRounds)
            .then(hash => {
            return admins_1.Admin.create({ email, password: hash, role })
                .then(u => console.log("success"));
            //=> this.getAdminById(u!.id))
        });
    }
    login({ email }) {
        console.log(email);
        return admins_1.Admin.findOne({ where: { email } }).then(u => {
            const { id, email } = u;
            return { token: jwt.sign({ id, email }, this._jwtSecret) };
        });
    }
    verifyToken(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, this._jwtSecret, (err, decoded) => {
                if (err) {
                    resolve(false);
                    return;
                }
                AdminService._admin = admins_1.Admin.findById(decoded['id']);
                resolve(true);
                return;
            });
        });
    }
    getAdminById(id) {
        return admins_1.Admin.findById(id, {
            attributes: AdminService.adminAttributes
        });
    }
}
exports.AdminService = AdminService;
//# sourceMappingURL=admin.service.js.map