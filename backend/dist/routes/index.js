"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("../controllers/index");
const router = express_1.default.Router();
router.post('/register', index_1.registerGateway);
router.post('/savedevice', index_1.saveDevice);
router.get("/getalldata", index_1.getAllGatewaysData);
router.get("/getalldata/:serialNumber", index_1.getUserDetails);
exports.default = router;
