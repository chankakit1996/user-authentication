import { jwtConfig } from '../config/config';
import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../models';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        let token = req.header('Authorization');
        if (!token) throw new Error();
        token = token.replace('Bearer ', '');
        const decoded = jwt.verify(token, jwtConfig.secret) as JwtPayload;
        const user = await User.findOne({
            _id: decoded._id,
            'jwt.token': token,
        });
        if (!user) throw new Error();
        req.token = token;
        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({
            errors: ['Please register or login again to continue.'],
        });
    }
};
