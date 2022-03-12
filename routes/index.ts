import express from 'express';
import user from '../controllers';
import auth from '../middleware/auth'

const router = express.Router();

router
    .get('/get-users', auth, user.getUsers)
    .post('/register', user.register)
    .post('/login', user.login)
    .get('/logout', auth, user.logout)
    .get('/logout-all', auth, user.logoutAll)
    .post('/reset-password', user.resetPassword);

export default router;
