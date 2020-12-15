import { Response } from 'express';
import { MESSAGES } from '../../util/constants';
import { Record } from '../../model/Record';
import { ServerError } from '../../util/utils';
import { AugmentedRequest } from 'global';

const deleteRecord = async (req: AugmentedRequest, res: Response) => {
  const recordID = req.body.recordID;

  if (!recordID) {
    res.send({ succ: false, message: MESSAGES.RECORD_NOT_FOUND });
    throw new ServerError({ statusCode: 400, message: MESSAGES.RECORD_NOT_FOUND });
  }

  let recordExist: boolean;
  try {
    recordExist = await Record.exists({ _id: recordID });
  } catch (e) {
    res.send({ succ: false, message: MESSAGES.RECORD_NOT_FOUND });
    throw new ServerError({
      statusCode: 400,
      message: MESSAGES.RECORD_NOT_FOUND,
    });
  }

  if (!recordExist) {
    res.send({ succ: false, message: MESSAGES.RECORD_NOT_FOUND });
    throw new ServerError({
      statusCode: 400,
      message: MESSAGES.RECORD_NOT_FOUND,
    });
  } else {
    await Record.deleteOne({ _id: recordID });
    res.send({ succ: true, message: MESSAGES.DEL_RECORD_SUCC });
  }
};

export default deleteRecord;
