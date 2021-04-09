import { Request, Response } from 'express';
import { MESSAGES } from '../../util/constants';
import { User } from '../../model/User';
import moment from 'moment';

interface UpdateCategoriesRequest {
  _id: string;
  expenseList: string;
  incomeList: string;
}

export default async (req: Request, res: Response): Promise<void> => {
  const { _id, expenseList, incomeList }: UpdateCategoriesRequest = req.body;

  if (!_id) {
    res.status(202).send(MESSAGES.USER_ID_NOT_PROVIDED);
    return;
  }

  let userExist: boolean;
  try {
    userExist = await User.exists({ _id: _id });
    if (!userExist) {
      res.status(202).send(MESSAGES.USER_NOT_EXIST);
      return;
    }
  } catch (err) {
    console.log(`Server error: ${err}`);
    res.status(500).send(MESSAGES.UNEXPECTED_ERROR);
  }

  if (!expenseList || !incomeList) {
    res.status(202).send(MESSAGES.EMPTY_LIST);
    return;
  }

  try {
    const user = await User.findOneAndUpdate(
      { _id },
      {
        $set: {
          expenseList: JSON.parse(expenseList),
          incomeList: JSON.parse(incomeList),
        },
        updatedOn: moment().format('LLL'),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res
      .status(200)
      .send({ expenseList: user.expenseList, incomeList: user.incomeList });
  } catch (err) {
    console.log(`Server error: ${err}`);
    res.status(500).send(MESSAGES.UNEXPECTED_ERROR);
  }
};
