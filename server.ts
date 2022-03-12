import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import { corsOpts, mongoDB } from './config/config';
import router from './routes';
import path from 'path';
import fallback from 'connect-history-api-fallback';

const app = express();

app.use(fallback());
app.use(cors(corsOpts));
app.use(bodyParser.json());
app.use('/api/', router);

const port = process.env.PORT || 4000;
const dbURL = process.env.MONGODB_URI || mongoDB.URL;

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

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('public'));
    app.route('/*').get(function (req, res) {
        res.sendFile('public/index.html');
    });
}

app.listen(port, () => {
    console.log(`Server is started at ${port}`);
});
