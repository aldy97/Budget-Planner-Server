import express from 'express';
import login from './user/Login';
import register from './user/Register';
import createRecord from './record/CreateRecord';
import getRecords from './record/GetRecords';
import deleteRecord from './record/DeleteRecord';
import updateRecord from './record/UpdateRecord';

const router = express.Router();

router.use('/api', register);
router.use('/api', login);
router.use('/api', createRecord);
router.use('/api', getRecords);
router.use('/api', deleteRecord);
router.use('/api', updateRecord);

export default router;
