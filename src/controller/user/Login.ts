import { Request, Response } from 'express';
import { MESSAGES } from '../../util/constants';
import { UserDocument, User } from '../../model/User';

export default async (request: Request, response: Response) => {
  const { email, password } = request.body;

  if (!email) {
    response.status(400).send({ message: MESSAGES.EMPTY_EMAIL });
    return;
  }

  if (!password) {
    response.status(400).send({ message: MESSAGES.EMPTY_PASSWORD });
    return;
  }

  const user: UserDocument | null = await User.findOne({
    email,
    password,
  });

  if (!user) {
    response.status(404).send({ message: MESSAGES.WRONG_CREDENTIALS });
    return;
  } else {
    response.status(201).send({
      user,
    });
  }
};
