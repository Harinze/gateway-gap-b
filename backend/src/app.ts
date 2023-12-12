import  { Request, Response } from 'express';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db/db';
import routes from "./routes/index";

dotenv.config();
connectDB()


const app = express();
const port = process.env.PORT


app.use(cors());
app.use(express.json());

app.use('/', routes);

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello, This is inform you that backend of device gateway app is up and running!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


//export default app;
