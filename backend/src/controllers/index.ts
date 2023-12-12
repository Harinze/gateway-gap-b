import { Request, Response } from 'express';
import Gateway, { IGateway } from '../models/gateway';
import Device from '../models/device';

export const registerGateway = async (req: Request, res: Response) => {
  try {
    const { serialNumber, name, ipv4Address } = req.body;

    const lowerCaseSerialNumber = serialNumber.toLowerCase();

    const existingSerialNumber = await Gateway.findOne({ serialNumber: lowerCaseSerialNumber });
    if (existingSerialNumber) {
      return res.status(400).json({ message: 'Serial number already exists' });
    }

    const existingIpv4Address = await Gateway.findOne({ ipAddress: ipv4Address });
    if (existingIpv4Address) {
      return res.status(400).json({ message: 'IPv4 address already exists' });
    }

    const gateway: IGateway = new Gateway({
      serialNumber: lowerCaseSerialNumber,
      name,
      ipAddress: ipv4Address,
    });

    await gateway.save();

    res.status(201).json({ 
      message: 'Gateway registered successfully',
      gateway,
      userId: gateway._id,
    });
  } catch (error: any) {
    console.error('Error registering gateway:', error);
    res.status(500).json({ message: `${error.message}` });
  }
};


export const saveDevice = async (req: Request, res: Response) => {
  let { serialNumber, uid, vendor, status } = req.body;

  try {
    
    serialNumber = serialNumber.toLowerCase();

    let gateway = await Gateway.findOne({ serialNumber });

    if (!gateway) {
      return res.status(400).json({ message: 'Serial number not found' });
    }

    const uidExists = await Gateway.findOne({
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
    
    const newDevice = new Device({ uid, vendor, status, serialNumber});
    
    gateway.devices.push(newDevice);

    gateway.status = gateway.devices.length === 10;

    await gateway.save();

    res.status(200).json({
      message: 'Device saved successfully',
      newDevice,
      status: gateway.status,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: `${error}` });
  }
};


export const getAllGatewaysData = async (_req:Request, res:Response) => {
  try {
    const users = await Gateway.find().populate('devices');
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users and devices:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const getUserDetails = async (req: Request, res: Response) => {
   
  const serialNumber = req.params.serialNumber; 

  try {
    const user = await Gateway.findOne({ serialNumber }); 

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json( user );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};




