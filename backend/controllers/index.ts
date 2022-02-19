import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import User from 'models';
import HttpStatusCode from 'helpers/http-status-code';

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.find();
        res.status(HttpStatusCode.OK).json({
            users,
        });
    } catch (err) {
        res.status(HttpStatusCode.NOT_FOUND).json({
            errors: 'some error occurs',
        });
    }
};

const register = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    try {
        await user.save();
        res.status(HttpStatusCode.CREATED).json({
            user,
        });
    } catch (err) {
        if (err instanceof mongoose.Error.ValidationError) {
            let errors = [];
            for (const [key, value] of Object.entries(err.errors)) {
                errors.push(value.message);
            }
            res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors });
        } else if (err instanceof mongoose.mongo.MongoError) {
            res.status(HttpStatusCode.BAD_REQUEST).json({
                errors: ['email is duplicated'],
            });
        } else {
            res.status(HttpStatusCode.BAD_REQUEST).json({
                errors: ['some error occurs'],
            });
        }
    }
};

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.comparePassword(password))) {
        const token = await user.getJWT();
        res.status(HttpStatusCode.OK).json({
            token,
        });
    } else {
        res.status(HttpStatusCode.UNAUTHORIZED).json({
            errors: ['email and password are not match'],
        });
    }
};

const resetPassword = async (req: Request, res: Response) => {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        user.password = newPassword;
        await user.save();
        res.status(HttpStatusCode.OK).json({
            message: 'password is reset. Please login.',
        });
    } else {
        res.status(HttpStatusCode.UNAUTHORIZED).json({
            errors: ['email is not found in database'],
        });
    }
};

const logout = async (req: Request, res: Response) => {
    try {
        const { token, user } = req;
        if (!token) throw Error();
        if (!user) throw Error();
        user.jwt = user.jwt.filter((token) => {
            token !== token;
        });
        await user.save();
        res.status(HttpStatusCode.OK).json({
            data: {
                message: 'you have successfully logged out',
            },
        });
    } catch (err) {
        res.status(HttpStatusCode.BAD_REQUEST).json({
            error: 'you have logout or you are not logged in',
        });
    }
};

const logoutAll = async (req: Request, res: Response) => {
    res.json('api works');
};

export default {
    getUsers,
    register,
    login,
    resetPassword,
    logout,
    logoutAll,
};
