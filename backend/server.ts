import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { mongoDB } from './config/config';
import mongoose from 'mongoose';

const app = express()

// Body parser middleware
app.use(bodyParser.json())

const db = mongoDB.URL
mongoose.connect(db).then(() => {
    console.log('mongo DB is connected')
})

const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log(`Server is started at ${port}`)
})