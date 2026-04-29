import { Schema } from 'mongoose';
import { User } from 'src/bussiness/entities/user.entity';

export const StationSchema = new Schema(
  {
    name: String,
    location: {
      type: { type: String, enum: ['Point'], default: 'Point', required: true },
      coordinates: { type: [Number], required: true },
    },
    sensorModel: String,
    state: { type: String, enum: ['active', 'inactive'], default: 'active' },
    owner: { type: Schema.Types.ObjectId, ref: User.name },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, selectPopulatedPaths: true },
);

StationSchema.index({ location: '2dsphere' });
