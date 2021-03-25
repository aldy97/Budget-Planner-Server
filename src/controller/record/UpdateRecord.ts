import { Request, Response } from 'express';
import { MESSAGES } from '../../util/constants';
import { Record } from '../../model/Record';
import moment from 'moment';

const updateRecord = async (req: Request, res: Response): Promise<void> => {
  const { _id, updatedFields } = req.body;

  if (!_id) {
    res.status(400).send({ message: MESSAGES.RECORD_ID_NOT_PROVIDED });
    return;
  }

  let recordExist: boolean;
  try {
    recordExist = await Record.exists({ _id });
  } catch (e) {
    res.status(404).send({ message: MESSAGES.RECORD_NOT_FOUND });
    return;
  }

  if (!recordExist) {
    res.status(404).send({ message: MESSAGES.RECORD_NOT_FOUND });
    return;
  }

  await Record.findOneAndUpdate(
    { _id },
    { ...updatedFields, updatedOn: moment().format('LLL') },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).send({ message: MESSAGES.UPDATE_RECORD_SUCC });
};

export default updateRecord;
