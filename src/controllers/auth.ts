import { Request, Response } from 'express';

import { getUserByEmail, createUser } from '../db/user';
import { authentication, random } from '../utils';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const rsp = {
        code: 200,
        msg: "SUCCESS",
        status: "LOGGED IN"
    }

    if (!email || !password) {
        rsp.code = 400,
        rsp.msg = "Invalid schema"
        rsp.status = "LOGIN FAILED"
      return res.send(rsp);
    }

    const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');

    if (!user) {
        rsp.code = 400,
        rsp.msg = "Account not found"
        rsp.status = "LOGIN FAILED"
      return res.send(rsp);
    }

    //@ts-ignore
    const expectedHash = authentication(user.authentication.salt, password);
    
    //@ts-ignore
    if (user.authentication.password != expectedHash) {
        rsp.code = 403,
        rsp.msg = "Incorrect password"
        rsp.status = "LOGIN FAILED"
      return res.send(rsp);
    }

    const salt = random();
    //@ts-ignore
    user.authentication.sessionToken = authentication(salt, user._id.toString());

    await user.save();

    //@ts-ignore
    res.cookie('ANTONIO-AUTH', user.authentication.sessionToken, { domain: 'localhost', path: '/' });

    return res.send(rsp);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body;
    const rsp = {
        code: 200,
        msg: "SUCCESS"
    }

    // console.log(JSON.stringify(req.body))

    if (!email || !password || !username) {
        rsp.code = 400
        rsp.msg = "Invalid Schema!"
      return res.send(rsp)
    }

    const existingUser = await getUserByEmail(email);
  
    if (existingUser) {
        rsp.code = 400
        rsp.msg = "Account already exists!"
      return res.send(rsp)
    }

    const salt = random();
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    return res.status(200).json(rsp).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}