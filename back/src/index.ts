import cors from 'cors';
import express from 'express';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    cors({
        origin: process.env.FRONT_LOCAL_URL,
        credentials: true,
        optionsSuccessStatus: 200
    })
);

mongoose.set('strictQuery', false);
mongoose.set('toJSON', { getters: true });
mongoose.set('toObject', { getters: true });
mongoose.connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_KEY}@cluster0.ypfcxuo.mongodb.net/`
);
mongoose.connection.on('error', () =>
    console.log('Database connection failed')
);
mongoose.connection.on('open', () =>
    console.log('Database connection is successfull')
);
app.listen(process.env.PORT_BACKEND, () =>
    console.log(`server is running at ${process.env.BACK_LOCAL_URL}`)
);
