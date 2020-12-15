import { Request, Response } from 'express';
import { MESSAGES } from '../../util/constants';
import { UserDocument, User } from '../../model/User';

const checkLogin = async (request: Request, response: Response) => {
  const { email, password } = request.body;
  if (!email) {
    response.json({ login: false, message: MESSAGES.EMPTY_EMAIL });
  }

  if (!password) {
    response.json({ login: false, message: MESSAGES.EMPTY_PASSWORD });
  }

  const user: UserDocument | null = await User.findOne({
    email,
    password,
  });

  if (!user) {
    response.json({ login: false, message: MESSAGES.WRONG_CREDENTIALS });
  } else {
    response.json({ login: true, uid: user._id, name: user.name });
  }
};

export default checkLogin;
