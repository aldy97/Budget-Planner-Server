import { Request, Response } from 'express';
import { MESSAGES } from '../../util/constants';
import { Record } from '../../model/Record';

export default async (req: Request, res: Response) => {
  const recordID = req.body.recordID;

  if (!recordID) {
    res.status(400).send({ succ: false, message: MESSAGES.RECORD_ID_NOT_PROVIDED });
    return;
  }

  let recordExist: boolean;
  try {
    recordExist = await Record.exists({ _id: recordID });
  } catch (e) {
    res.status(404).send({ succ: false, message: MESSAGES.RECORD_NOT_FOUND });
  }

  if (!recordExist) {
    res.status(404).send({ succ: false, message: MESSAGES.RECORD_NOT_FOUND });
    return;
  }

  await Record.deleteOne({ _id: recordID });
  res.status(202).send({ message: MESSAGES.DEL_RECORD_SUCC });
};
