import express from "express";
import dotenv from "dotenv";
import {errorHandler} from './middlewares/errorHander';
import router from './routes/routes';
import connectDb from './config/mongodb';
connectDb()
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(errorHandler);

app.use('/', router);

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
