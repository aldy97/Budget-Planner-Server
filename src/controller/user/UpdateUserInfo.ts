import { Request, Response } from 'express';
import { MESSAGES } from '../../util/constants';
import { User, UserDocument } from '../../model/User';
import moment from 'moment';

export default async (req: Request, res: Response): Promise<void> => {
  const { _id, updatedFields } = req.body;

  if (!_id) {
    res.status(400).send({ message: MESSAGES.USER_ID_NOT_PROVIDED });
    return;
  }

  let userExist: boolean;
  try {
    userExist = await User.exists({ _id });
  } catch (e) {
    res.status(404).send({ message: MESSAGES.USER_NOT_EXIST });
  }

  if (!userExist) {
    res.status(404).send({ message: MESSAGES.USER_NOT_EXIST });
    return;
  }

  try {
    const updatedUser: UserDocument = await User.findOneAndUpdate(
      { _id },
      { ...updatedFields, updatedOn: moment().format('LLL') },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).send({
      user: updatedUser,
    });
  } catch (e) {
    res.status(500).send({ message: MESSAGES.UNEXPECTED_ERROR });
  }
};
