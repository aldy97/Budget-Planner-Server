import express from 'express';
import checkLogin from '../../controller/user/Login';

const router = express.Router();

router.post('/login', checkLogin);

export default router;
