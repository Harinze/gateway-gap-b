

import mongoose, { Document, Schema } from 'mongoose';
import Device, { IDevice } from '../models/device';

export interface IGateway extends Document {
  serialNumber: string;
  name: string;
  ipAddress: string;
  devices: IDevice[];
  status: boolean;
  createdAt: Date;
}

const GatewaySchema: Schema = new Schema(
  {
    serialNumber: { type: String, required: true },
    name: { type: String, required: true },
    ipAddress: { type: String, required: true },
    devices: [Device.schema],
    status: { type: Boolean, default: false },
    createdAt: {type:Date}
  },
  { timestamps: true }
);

GatewaySchema.index({ 'devices.serialNumber': 1 }, { sparse: true });

const Gateway = mongoose.model<IGateway>('Gateway', GatewaySchema);

export default Gateway;
