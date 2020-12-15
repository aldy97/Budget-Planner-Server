import express from 'express';
import updateRecord from '../../controller/record/UpdateRecord';

const router = express.Router();

router.put('/updateRecord', updateRecord);

export default router;
