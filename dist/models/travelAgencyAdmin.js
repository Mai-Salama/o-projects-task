"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = __importStar(require("sequelize"));
const sequelize_1 = require("../sequelize");
exports.TravelAgencyAdmin = sequelize_1.sequelize.define('travel_agency_admins', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    role: Sequelize.STRING,
    name: Sequelize.STRING,
    travel_agency_name: Sequelize.STRING,
    mobile_number: Sequelize.STRING,
    license: Sequelize.STRING,
    provisions: Sequelize.STRING,
    about: Sequelize.STRING,
    rating: Sequelize.NUMBER,
    address: Sequelize.STRING,
    location: Sequelize.NUMBER,
    mobile_number1: Sequelize.STRING,
    mobile_number2: Sequelize.STRING,
    email1: Sequelize.STRING,
    email2: Sequelize.STRING,
    website: Sequelize.STRING,
    whatsapp: Sequelize.STRING,
    facebook: Sequelize.STRING,
    instagram: Sequelize.STRING,
    logo: Sequelize.STRING,
    profile_picture: Sequelize.STRING,
    payment_method: Sequelize.STRING
});
//# sourceMappingURL=travelAgencyAdmin.js.map