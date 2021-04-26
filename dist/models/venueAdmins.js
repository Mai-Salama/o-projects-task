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
exports.VenueAdmin = sequelize_1.sequelize.define('venue_admins', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    role: Sequelize.STRING,
    name: Sequelize.STRING,
    mobile_number: Sequelize.STRING,
    venue_name: Sequelize.STRING,
    profile_picture: Sequelize.STRING
});
//# sourceMappingURL=venueAdmins.js.map