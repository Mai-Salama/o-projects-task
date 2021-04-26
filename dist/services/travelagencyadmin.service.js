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
const travelAgencyAdmin_1 = require("../models/travelAgencyAdmin");
class TravelAgencyAdminService {
    constructor() {
        this._saltRounds = 12;
        this._jwtSecret = 'jwtSecret';
    }
    static get adminAttributes() {
        return ['id', 'email', 'role', 'name', 'travel_agency_name', 'mobile_number', 'license', 'provisions', 'about',
            'rating', 'address', 'location', 'mobile_number1', 'mobile_number2', 'email1', 'email2', 'website', 'whatsapp', 'facebook',
            'instagram', 'logo', 'profile_picture', 'payment_method'];
    }
    static get travelagencyadmin() {
        return TravelAgencyAdminService._travelagencyadmin;
    }
    register({ email, password, role, name, travel_agency_name, mobile_number, license, provisions, about, rating, address, location, mobile_number1, mobile_number2, email1, email2, website, whatsapp, facebook, instagram, logo, profile_picture, payment_method }) {
        console.log("got into register AdminService");
        bcrypt.hash(password, this._saltRounds)
            .then(hash => {
            return travelAgencyAdmin_1.TravelAgencyAdmin.create({ email, password: hash, role, name, travel_agency_name, mobile_number, license, provisions, about,
                rating, address, location, mobile_number1, mobile_number2, email1, email2, website, whatsapp, facebook,
                instagram, logo, profile_picture, payment_method })
                .then(u => console.log("success"));
            //=> this.getAdminById(u!.id))
        });
    }
    login({ email, password }) {
        console.log(email);
        return travelAgencyAdmin_1.TravelAgencyAdmin.findOne({ where: { email } }).then(u => {
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
                TravelAgencyAdminService._travelagencyadmin = travelAgencyAdmin_1.TravelAgencyAdmin.findById(decoded['id']);
                resolve(true);
                return;
            });
        });
    }
    getAdminById(id) {
        return travelAgencyAdmin_1.TravelAgencyAdmin.findById(id, {
            attributes: TravelAgencyAdminService.adminAttributes
        });
    }
}
exports.TravelAgencyAdminService = TravelAgencyAdminService;
//# sourceMappingURL=travelagencyadmin.service.js.map