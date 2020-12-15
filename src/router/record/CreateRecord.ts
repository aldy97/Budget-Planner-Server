import express from 'express';
import createRecord from '../../controller/record/CreateRecord';

const router = express.Router();

router.post('/createRecord', createRecord);

export default router;
