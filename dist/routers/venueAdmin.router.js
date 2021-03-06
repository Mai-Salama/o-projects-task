"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const venueadmin_service_1 = require("../services/venueadmin.service");
const admin_service_1 = require("../services/admin.service");
exports.venueAdminRouter = express_1.Router();
const userService = new venueadmin_service_1.VenueAdminService();
const adminService = new admin_service_1.AdminService();
exports.venueAdminRouter.post('/register', (req, res) => {
    adminService.verifyToken(req.header('token'));
    const errors = express_validator_1.validationResult(req);
    console.log("accessed router");
    if (!errors.isEmpty())
        return res.status(422).json(errors.array());
    const email = req.body.email;
    const password = req.body.password;
    const role = "VenueAdmin";
    const name = req.body.name;
    const mobile_number = req.body.mobile_number;
    const venue_name = req.body.venue_name;
    const profile_picture = req.body.profile_picture;
    const admin_header = req.header('token');
    console.log(admin_header);
    //const payload = matchedData({email, password, role}) as AdminAddModel
    const user = userService.register({ email, password, role, name, mobile_number, venue_name, profile_picture, admin_header });
    return ("successful");
});
exports.venueAdminRouter.post('/login', (req, res) => {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty())
        return res.status(422).json(errors.array());
    const email = req.body.email;
    const password = req.body.password;
    const role = "";
    console.log(email);
    //const payload = matchedData({email}) as AdminAddModel
    const token = userService.login({ email, password });
    return token.then(t => res.json(t));
});
//# sourceMappingURL=venueAdmin.router.js.map