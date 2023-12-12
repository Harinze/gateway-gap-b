"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserDetails = exports.getAllGatewaysData = exports.saveDevice = exports.registerGateway = void 0;
const gateway_1 = __importDefault(require("../models/gateway"));
const device_1 = __importDefault(require("../models/device"));
const registerGateway = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { serialNumber, name, ipv4Address } = req.body;
        const lowerCaseSerialNumber = serialNumber.toLowerCase();
        const existingSerialNumber = yield gateway_1.default.findOne({ serialNumber: lowerCaseSerialNumber });
        if (existingSerialNumber) {
            return res.status(400).json({ message: 'Serial number already exists' });
        }
        const existingIpv4Address = yield gateway_1.default.findOne({ ipAddress: ipv4Address });
        if (existingIpv4Address) {
            return res.status(400).json({ message: 'IPv4 address already exists' });
        }
        const gateway = new gateway_1.default({
            serialNumber: lowerCaseSerialNumber,
            name,
            ipAddress: ipv4Address,
        });
        yield gateway.save();
        res.status(201).json({
            message: 'Gateway registered successfully',
            gateway,
            userId: gateway._id,
        });
    }
    catch (error) {
        console.error('Error registering gateway:', error);
        res.status(500).json({ message: `${error.message}` });
    }
});
exports.registerGateway = registerGateway;
const saveDevice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { serialNumber, uid, vendor, status } = req.body;
    try {
        serialNumber = serialNumber.toLowerCase();
        let gateway = yield gateway_1.default.findOne({ serialNumber });
        if (!gateway) {
            return res.status(400).json({ message: 'Serial number not found' });
        }
        const uidExists = yield gateway_1.default.findOne({
            serialNumber,
            'devices.uid': uid,
        });
        if (uidExists) {
            return res
                .status(400)
                .json({ message: 'Device with the same uid already exists for this serialNumber' });
        }
        if (gateway.devices.length >= 10) {
            return res.status(400).json({ message: 'Maximum number of devices reached for this user' });
        }
        const newDevice = new device_1.default({ uid, vendor, status, serialNumber });
        gateway.devices.push(newDevice);
        gateway.status = gateway.devices.length === 10;
        yield gateway.save();
        res.status(200).json({
            message: 'Device saved successfully',
            newDevice,
            status: gateway.status,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: `${error}` });
    }
});
exports.saveDevice = saveDevice;
const getAllGatewaysData = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield gateway_1.default.find().populate('devices');
        res.status(200).json(users);
    }
    catch (error) {
        console.error('Error fetching users and devices:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getAllGatewaysData = getAllGatewaysData;
const getUserDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const serialNumber = req.params.serialNumber;
    try {
        const user = yield gateway_1.default.findOne({ serialNumber });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.getUserDetails = getUserDetails;
