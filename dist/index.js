"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const admin_router_1 = require("./routers/admin.router");
const token_guard_1 = require("./middlewares/token-guard");
const venueAdmin_router_1 = require("./routers/venueAdmin.router");
const travelAgencyAdmin_router_1 = require("./routers/travelAgencyAdmin.router");
const app = express_1.default();
const port = 3000;
app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
});
console.log("checking");
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(cors_1.default());
app.use('/', admin_router_1.userRouter);
app.use('/venue', venueAdmin_router_1.venueAdminRouter);
app.use('/travelAgency', travelAgencyAdmin_router_1.TravelAgencyAdminRouter);
app.use(token_guard_1.tokenGuard());
app.get('/hello', (req, res) => {
    res.json("Hello");
});
//# sourceMappingURL=index.js.map