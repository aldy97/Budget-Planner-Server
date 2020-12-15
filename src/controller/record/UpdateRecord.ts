import { Request, Response } from 'express';
import { MESSAGES } from '../../util/constants';
import { Record, RecordDocument } from '../../model/Record';
import { ServerError } from '../../util/utils';

const updateRecord = async (req: Request, res: Response) => {
  const { _id, updatedFields } = req.body;

  if (!_id) {
    res.send({ status: false, message: MESSAGES.UNEXPECTED_ERROR });
    throw new ServerError({
      statusCode: 400,
      message: MESSAGES.UNEXPECTED_ERROR,
    });
  }

  let recordExist: boolean;
  try {
    recordExist = await Record.exists({ _id });
  } catch (e) {
    res.send({ status: false, message: MESSAGES.UNEXPECTED_ERROR });
    throw new ServerError({
      statusCode: 400,
      message: MESSAGES.UNEXPECTED_ERROR,
    });
  }

  if (!recordExist) {
    res.send({ status: false, message: MESSAGES.RECORD_NOT_FOUND });
    throw new ServerError({
      statusCode: 400,
      message: MESSAGES.RECORD_NOT_FOUND,
    });
  }

  const updatedRecord: RecordDocument = await Record.findOneAndUpdate(
    { _id },
    updatedFields,
    {
      new: true,
      runValidators: true,
    }
  );

  res.send({ status: true, updatedRecord, message: MESSAGES.UPDATE_RECORD_SUCC });
};

export default updateRecord;
