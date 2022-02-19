import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import { corsOpts, mongoDB } from './config/config';
import router from './routes';
import timeout from 'connect-timeout';

const app = express();

app.use(cors(corsOpts));
app.use(bodyParser.json());
app.use('/api/', router);

const port = process.env.PORT || 4000;
const dbURL = mongoDB.URL;

mongoose
    .connect(dbURL)
    .then(() => {
        const connection = mongoose.connection;
        console.log(
            `database ${connection.name} is connected at ${connection.host}:${connection.port}`
        );
    })
    .catch((err) => {
        console.error(err);
    });

app.listen(port, () => {
    console.log(`Server is started at ${port}`);
});
