import express from 'express';
import mongoose from 'mongoose';
import customerRouter from './routes/customerRoutes.js';
import captainRouter from './routes/captainRoutes.js';
import pdCombineRouter from './routes/pdCombineRoutes.js';
import mailRouter from './routes/mailRoutes.js';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();
const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.MONGO)
.then(console.log(`DB Connection Successfull!!`))
.catch((err)=>console.log(err));

const app = express();
app.use(cors());
app.use(cookieParser());

app.use(express.json());
app.use("/api/customers",customerRouter);
app.use("/api/captains",captainRouter);
app.use("/api",pdCombineRouter);
app.use("/api/mail",mailRouter);

app.listen(PORT,(request,response)=>{
    console.log(`Server Listening on Port : ${PORT}`);
});

