import express from 'express';
import checkRegister from '../../controller/user/Register';

const router = express.Router();

router.post('/register', checkRegister);

export default router;
