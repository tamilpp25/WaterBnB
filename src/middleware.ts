import { Request, Response, NextFunction } from 'express';
import { merge, get } from 'lodash';

import { getUserBySessionToken } from './db/user'; 

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rsp = {
        code: 403,
        msg: "Not Authenticated"
    }
    const sessionToken = req.cookies['WATERBNB-AUTH'];

    if (!sessionToken) {
      return res.send(rsp);
    }

    const existingUser = await getUserBySessionToken(sessionToken);

    if (!existingUser) {
      return res.send(rsp);
    }

    merge(req, { identity: existingUser });

    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

export const isOwner = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    //@ts-ignore
    const currentUserId = get(req, 'identity._id') as string;

    if (!currentUserId) {
      return res.sendStatus(400);
    }

    if (currentUserId.toString() !== id) {
      return res.sendStatus(403);
    }

    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}