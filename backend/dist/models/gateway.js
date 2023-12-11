"use strict";
// import mongoose, { Document, Schema } from 'mongoose';
// import Device, { IDevice } from '../models/device';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// export interface IGateway extends Document {
//   serialNumber: string;
//   name: string;
//   ipAddress: string;
//   devices: IDevice[];
//   status: boolean;
//   createdAt: Date;
//   updatedAt: Date;
// }
// const GatewaySchema: Schema = new Schema(
//   {
//     serialNumber: { type: String, required: true },
//     name: { type: String, required: true },
//     ipAddress: { type: String, required: true },
//     devices: [Device.schema],
//     status: { type: Boolean, default: false },
//   },
//   { timestamps: true }
// );
// const Gateway = mongoose.model<IGateway>('Gateway', GatewaySchema);
// export default Gateway;
const mongoose_1 = __importStar(require("mongoose"));
const device_1 = __importDefault(require("../models/device"));
const GatewaySchema = new mongoose_1.Schema({
    serialNumber: { type: String, required: true },
    name: { type: String, required: true },
    ipAddress: { type: String, required: true },
    devices: [device_1.default.schema],
    status: { type: Boolean, default: false },
    createdAt: { type: Date }
}, { timestamps: true });
// Adding sparse index for serialNumber in the devices array
GatewaySchema.index({ 'devices.serialNumber': 1 }, { sparse: true });
const Gateway = mongoose_1.default.model('Gateway', GatewaySchema);
exports.default = Gateway;
