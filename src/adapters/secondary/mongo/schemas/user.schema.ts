import { Schema } from 'mongoose';

export const UserSchema = new Schema(
  { firstName: String, lastName: String, email: { type: String, unique: true }, password: String },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } },
);
