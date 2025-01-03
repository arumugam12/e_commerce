import express from 'express';
import cors from 'cors';
import router from './routes/routes.js';
import { connectToDataBase } from './dbConfig/dbConfig.js';

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

connectToDataBase();

app.use("/", router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})