import { Request, Response } from 'express';
import { IUser, User } from '../../model/User';
import { MESSAGES } from '../../util/constants';
import validator from 'validator';

export default async (request: Request, response: Response) => {
  const { name, password, email }: IUser = request.body;
  const confirmPassword: string = request.body.confirmPassword;

  if (!email) {
    response.status(400).send({ message: MESSAGES.EMPTY_EMAIL });
    return;
  }

  if (!validator.isEmail(email)) {
    response.status(400).send({ message: MESSAGES.INVALID_EMAIL });
    return;
  }

  if (!name) {
    response.status(400).send({ message: MESSAGES.EMPTY_NAME });
    return;
  }

  if (!password) {
    response.status(400).send({ message: MESSAGES.EMPTY_PASSWORD });
    return;
  }

  if (password.length < 7) {
    response.status(400).send({ message: MESSAGES.PASSWORD_TOO_SHORT });
    return;
  }

  if (!confirmPassword) {
    response.status(400).send({ message: MESSAGES.CONFIRM_PASSWORD_EMPTY });
    return;
  }

  if (password !== confirmPassword) {
    response.status(400).send({ message: MESSAGES.PASSWORDS_DO_NOT_MATCH });
    return;
  }

  let userExists: boolean;
  try {
    userExists = await User.exists({ email });
  } catch (err) {
    response.send({ message: MESSAGES.EMAIL_REGISTER });
  }

  const userInfo: IUser = {
    email,
    name,
    password,
  };

  const newUser = await new User(userInfo).save();
  response.status(200).send({ user: newUser });
};
