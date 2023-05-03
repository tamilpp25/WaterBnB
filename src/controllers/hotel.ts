import { Request, Response } from 'express';

import { authentication, random } from '../utils';
import { getHotels } from '../db/hotel';

export const hotelList = async (req: Request, res: Response) => {
    try {
    const hotels = await getHotels();

    return res.status(200).json(hotels);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

export const bookHotel = async (req: Request, res: Response) => {
  try {
    const { id, people } = req.body;
    res.send({code: 0, msg: "NOT IMPLEMENTED"})
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}