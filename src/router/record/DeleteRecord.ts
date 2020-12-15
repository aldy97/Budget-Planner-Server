import express from 'express';
import deleteRecord from '../../controller/record/DeleteRecord';

const router = express.Router();

router.delete('/deleteRecord', deleteRecord);

export default router;
