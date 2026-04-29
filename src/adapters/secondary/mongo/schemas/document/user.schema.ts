import { Schema } from 'mongoose';
import { Station } from 'src/bussiness/entities/station.entity';

export const UserSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String,
    stations: [{ type: Schema.Types.ObjectId, ref: Station.name }],
    subscriptions: [{ type: Schema.Types.ObjectId, ref: Station.name }],
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } },
);
