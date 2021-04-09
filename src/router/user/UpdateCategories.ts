import express from 'express';
import updateCategories from '../../controller/user/UpdateCategories';

const router = express.Router();

router.put('/updateCategories', updateCategories);

export default router;
