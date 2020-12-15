import express from 'express';
import getRecords from '../../controller/record/GetRecords';

const router = express.Router();

router.get('/getRecords/:user', getRecords);

export default router;
