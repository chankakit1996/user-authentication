import express from 'express';
import user from 'controllers';
import auth from 'middleware/auth'

const router = express.Router();

router
    .get('/get-all-users', auth, user.getUsers)
    .post('/register', user.register)
    .post('/login', user.login)
    .post('/logout', auth, user.logout)
    .post('/logout-all', auth, user.logoutAll)
    .post('/reset-password', user.resetPassword);

export default router;
