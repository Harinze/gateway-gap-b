
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import  { Request, Response } from 'express';
import connectDB from './db/db';
import registerRoute from "../src/routes/index";
import addDeviceRoute from "../src/routes/index";
import getAllGatewaysDataRoute from "../src/routes/index";

dotenv.config();
connectDB()


const app = express();
const port = process.env.PORT


app.use(cors());
app.use(express.json());

app.use('/', registerRoute);
// app.use('/', addDeviceRoute);
// app.use("/", getAllGatewaysDataRoute)

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello, This is the getway tracking backend!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


export default app;
