import { Request, Response } from 'express';
import { MESSAGES } from '../../util/constants';
import { User } from '../../model/User';

export default async (req: Request, res: Response): Promise<void> => {
  const user: string = req.params.user;
  if (!user) {
    res.status(400).send(MESSAGES.USER_ID_NOT_PROVIDED);
    return;
  }

  let userExists: boolean;
  try {
    userExists = await User.exists({ _id: user });
  } catch (err) {
    res.status(404).send({ message: MESSAGES.USER_NOT_EXIST });
  }

  if (!userExists) {
    res.status(404).send({ message: MESSAGES.USER_NOT_EXIST });
    return;
  }

  const foundUser = await User.findOne({ _id: user }).populate('records');
  res.status(200).send({ records: foundUser.records });
};
