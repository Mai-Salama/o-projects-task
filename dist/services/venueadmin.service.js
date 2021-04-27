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
const venueAdmins_1 = require("../models/venueAdmins");
class VenueAdminService {
    constructor() {
        this._saltRounds = 12;
        this._jwtSecret = 'jwtSecret';
    }
    static get adminAttributes() {
        return ['id', 'email', 'role', 'name', 'mobile_number', 'venue_name', 'profile_picture'];
    }
    static get venueadmin() {
        return VenueAdminService._venueadmin;
    }
    register({ email, password, role, name, mobile_number, venue_name, profile_picture, admin_header }) {
        console.log("got into register AdminService");
        // check token
        const verified = jwt.verify(admin_header, this._jwtSecret);
        console.log(verified['role']);
        if (verified['role'] == "Admin") {
            console.log("Admin access");
        }
        else {
            console.log("Deny access");
        }
        //console.log({email, password, role, name, mobile_number, venue_name, profile_picture})
        bcrypt.hash(password, this._saltRounds)
            .then(hash => {
            return venueAdmins_1.VenueAdmin.create({ email, password: hash, role, name, mobile_number, venue_name, profile_picture })
                .then(u => console.log("success"));
            //=> this.getAdminById(u!.id))
        });
    }
    login({ email, password }) {
        console.log(email);
        return venueAdmins_1.VenueAdmin.findOne({ where: { email } }).then(u => {
            const { id, email } = u;
            console.log("comparing passwords");
            bcrypt.compare(password, u.password, function (err, res) {
                if (err) {
                    console.log("wrong password");
                    return;
                }
                else {
                    console.log("correct password!");
                }
            });
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
                VenueAdminService._venueadmin = venueAdmins_1.VenueAdmin.findById(decoded['id']);
                resolve(true);
                return;
            });
        });
    }
    getAdminById(id) {
        return venueAdmins_1.VenueAdmin.findById(id, {
            attributes: VenueAdminService.adminAttributes
        });
    }
}
exports.VenueAdminService = VenueAdminService;
//# sourceMappingURL=venueadmin.service.js.map