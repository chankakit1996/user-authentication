import { validateEmail } from '../helpers/validation';
import mongoose, { Model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { bcryptConfig, jwtConfig } from '../config/config';

export interface UserInterface {
    username: string;
    email: string;
    password: string;
    jwt: {
        token?: string;
    }[];
}

export interface UserDocument extends UserInterface, Document {
    comparePassword: (candidatePassword: string) => Promise<Boolean>;
    getJWT: () => Promise<String>;
}

interface UserModel extends Model<UserDocument> {
    // findByUsername: (username: string) => Promise<IUserDocument>;
}

const userSchema: Schema<UserDocument> = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'username is missing'],
            minlength: 8,
        },
        email: {
            type: String,
            unique: true,
            required: [true, 'email is missing'],
            validate: {
                validator: function (v: string) {
                    return validateEmail(v);
                },
                message: `email is not valid`,
            },
        },
        password: {
            type: String,
            required: [true, 'password is missing'],
            minlength: 8
        },
        jwt: [
            {
                token: {
                    type: String,
                },
            },
        ],
    },
    {
        collection: 'user',
    }
);

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, bcryptConfig.salt);
        user.jwt = [];
    }

    next();
});

userSchema.methods.comparePassword = async function (
    candidatePassword: string
) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
};

userSchema.methods.getJWT = async function () {
    const user = this;
    const token = jwt.sign(
        {
            _id: user._id.toString(),
            username: user.username,
            email: user.email,
        },
        jwtConfig.secret,
        { expiresIn: '7 days' }
    );
    // token
    user.jwt = user.jwt.concat({ token });
    await user.save();
    return token;
};

// UserSchema.statics.findByUsername = function (username: string) {
//     return this.findOne({ username });
// };

const User = mongoose.model<UserDocument, UserModel>('User', userSchema);

export default User;
