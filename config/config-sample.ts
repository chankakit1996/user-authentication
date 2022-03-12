// Copy below to config.ts as your config file

import cors from 'cors';

export const mongoDB = {
    URL: 'mongodb+srv://<username>:<password>@url/<database>',
};

export const corsOpts: cors.CorsOptions = {};

export const bcryptConfig = {
    salt: ''
}

export const jwtConfig = {
    secret: ''
}