import { Response } from 'express';
import { ObjectId } from 'mongodb';
import { MESSAGES } from '../../util/constants';
import { Record, IRecord } from '../../model/Record';
import { ServerError } from '../../util/utils';
import { AugmentedRequest } from 'global';

const createRecord = async (req: AugmentedRequest, res: Response) => {
  const title: string = req.body.title ? req.body.title : 'No title';
  const user: ObjectId = req.body.user;
  const type: string = req.body.type;
  const category: string = req.body.category;
  const amount: number = req.body.amount;
  const description: string = req.body.description
    ? req.body.description
    : 'No description';
  const recordDate: string = req.body.recordDate;

  const recordInfo: IRecord = {
    title,
    user,
    type,
    category,
    amount,
    description,
    recordDate,
  };

  try {
    await new Record(recordInfo).save();
    res.send({ message: MESSAGES.ADD_RECORD_SUCC, status: true });
  } catch (e) {
    res.send({ message: MESSAGES.UNEXPECTED_ERROR, status: false });
    throw new ServerError({
      message: e,
      statusCode: 400,
    });
  }
};

export default createRecord;
