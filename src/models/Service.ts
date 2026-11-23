import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
  id: string;
  title: string;
  description: string;
  image: string;
  exploreUrl: string;
  order: number;
  isActive: boolean;
}

const ServiceSchema = new Schema<IService>(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    exploreUrl: { type: String, required: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Service = mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);
