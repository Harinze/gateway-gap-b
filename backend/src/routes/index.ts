import express from 'express';
import { getAllGatewaysData, getUserDetails, registerGateway, saveDevice } from '../controllers/index';

const router = express.Router();

router.post('/register', registerGateway);
router.post('/savedevice', saveDevice);

router.get("/getalldata", getAllGatewaysData)
router.get("/getalldata/:serialNumber", getUserDetails)
export default router; 
