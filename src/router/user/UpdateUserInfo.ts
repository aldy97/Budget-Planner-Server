import express from 'express';
import updateUserInfo from '../../controller/user/UpdateUserInfo';
const router = express.Router();

router.put('/updateUserInfo', updateUserInfo);

export default router;
