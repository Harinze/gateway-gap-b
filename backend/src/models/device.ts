import mongoose, { Schema, Document } from 'mongoose';

export interface IDevice extends Document {
  serialNumber: string;
  uid: number;
  vendor: string;
  status: boolean;
  createdAt: Date;
}

const DeviceSchema: Schema = new Schema(
  {
    serialNumber: { type: String, index: { sparse: true, unique: true } },
    uid: Number,
    vendor: String,
    status: Boolean,
    createdAt: Date
  },
  
);

const Device = mongoose.model<IDevice>('Device', DeviceSchema);

export default Device;
