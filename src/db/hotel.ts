import mongoose from 'mongoose';

const HotelSchema = new mongoose.Schema({
  username: { type: String, required: true },
  id: { type: String, required: true },
  detail: {
    rooms: { type: Number, required: true, select: false },
    people: { type: String, select: false },
    location: { type: String, select: false },
    cost: { type: String, select: false },
    description: { type: String, select: false },
  },
});

export const HotelModel = mongoose.model('Hotel', HotelSchema);

export const getHotels = () => HotelModel.find();
export const getHotelById = (id: string) => HotelModel.findOne({ id });
export const getHotelByUsername = (username: string) => HotelModel.findOne({ username });
export const createHotel = (values: Record<string, any>) => new HotelModel(values).save().then((hotel) => hotel.toObject());
export const deleteHotelById = (id: string) => HotelModel.findOneAndDelete({ _id: id });
export const updateHotelById = (id: string, values: Record<string, any>) => HotelModel.findByIdAndUpdate(id, values);