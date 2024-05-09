import express from 'express';
import mongoose from 'mongoose';
import { url, port } from './constants/constants';
import cors from "cors";
import router from "./routes/main";

const app = express();
app.use(express.json());
app.use(cors());
app.use('/', router); 

async function main() {
    try {
        await connection(url);
    } catch (e) {
        console.error(e);
    }
}

async function connection(url: string) {
    await mongoose.connect(url);
    console.log("connected to db");
}

main();

app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
});
