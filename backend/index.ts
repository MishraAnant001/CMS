import express, { urlencoded } from 'express';
import config from "config"
import cors from "cors"
import { connectdb } from './src/db';
import { mainRouter } from './src/routes';
import { errorHandler } from './src/middlewares';

const app = express();
app.use(express.json());
app.use(urlencoded({ extended: false }));
app.use(cors({
    origin: "localhost:4200",
    credentials: true
}));
app.use(mainRouter);
app.use(errorHandler);


(() => {
    try {
        const port: number = config.get("PORT");
        const url: string = config.get("MONGO_URI");
        connectdb(url);
        console.log("database connection established");
        app.listen(port, () => {
            console.log(`server is running on port ${port}`);
        })
    } catch (error) {
        console.log("Error while starting server" + error);
    }
})();