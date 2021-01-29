import { Request, Response } from 'express';
import { MESSAGES } from '../../util/constants';
import { Record, IRecord } from '../../model/Record';
import { User } from '../../model/User';

export default async (req: Request, res: Response): Promise<void> => {
  const title: string = req.body.title;
  const userID: string = req.body.userID;
  const type: string = req.body.type;
  const category: string = req.body.category;
  const amount: number = req.body.amount;
  const description: string = req.body.description;
  const recordDate: string = req.body.recordDate;

  if (!userID) {
    res.status(400).send({ message: MESSAGES.EMPTY_USER_ID });
    return;
  }

  let userExists: boolean;
  try {
    userExists = await User.exists({ _id: userID });
  } catch (e) {
    res.status(404).send({ message: MESSAGES.USER_ID_NOT_FOUND });
  }
  if (!userExists) {
    res.status(404).send({ message: MESSAGES.USER_ID_NOT_FOUND });
    return;
  }

  if (!type) {
    res.status(400).send({ message: MESSAGES.EMPTY_TYPE });
    return;
  }

  if (!category) {
    res.status(400).send({ message: MESSAGES.EMPTY_CAT });
    return;
  }

  if (!amount) {
    res.status(400).send({ message: MESSAGES.EMPTY_AMOUNT });
    return;
  }

  if (!recordDate) {
    res.status(400).send({ message: MESSAGES.EMPTY_RECORD_DATE });
    return;
  }

  const recordInfo: IRecord = {
    title,
    user: userID,
    type,
    category,
    amount,
    description,
    recordDate,
  };

  const newRecord = await new Record(recordInfo).save();
  await User.updateOne({ _id: userID }, { $push: { records: newRecord._id } });
  res.status(201).send({ message: MESSAGES.ADD_RECORD_SUCC });
};
