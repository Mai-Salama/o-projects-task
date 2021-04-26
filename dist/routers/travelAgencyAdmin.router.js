"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const travelagencyadmin_service_1 = require("../services/travelagencyadmin.service");
exports.TravelAgencyAdminRouter = express_1.Router();
const userService = new travelagencyadmin_service_1.TravelAgencyAdminService();
exports.TravelAgencyAdminRouter.post('/register', (req, res) => {
    const errors = express_validator_1.validationResult(req);
    console.log("accessed router");
    if (!errors.isEmpty())
        return res.status(422).json(errors.array());
    const email = req.body.email;
    const password = req.body.password;
    const role = "TravelAgencyAdmin";
    const name = req.body.name;
    const travel_agency_name = req.body.agency_name;
    const mobile_number = req.body.mobile_number;
    const license = req.body.license;
    const provisions = req.body.provisions;
    const about = req.body.about;
    const rating = req.body.rating;
    const address = req.body.address;
    const location = req.body.location;
    const mobile_number1 = req.body.mobile_number1;
    const mobile_number2 = req.body.mobile_number2;
    const email1 = req.body.email1;
    const email2 = req.body.email2;
    const website = req.body.website;
    const whatsapp = req.body.whatsapp;
    const facebook = req.body.facebook;
    const instagram = req.body.instagram;
    const logo = req.body.logo;
    const profile_picture = req.body.profile_picture;
    const payment_method = req.body.payment_method;
    //const payload = matchedData({email, password, role}) as AdminAddModel
    const user = userService.register({ email, password, role, name, travel_agency_name, mobile_number, license, provisions, about,
        rating, address, location, mobile_number1, mobile_number2, email1, email2, website, whatsapp, facebook,
        instagram, logo, profile_picture, payment_method });
    console.log(user);
    return ("successful");
});
exports.TravelAgencyAdminRouter.post('/login', (req, res) => {
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
//# sourceMappingURL=travelAgencyAdmin.router.js.map