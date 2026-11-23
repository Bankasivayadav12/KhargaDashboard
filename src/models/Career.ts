import mongoose, { Schema, Document } from 'mongoose';

export interface ICareer extends Document {
  id: string;
  title: string;
  location: string;
  type: string;
  experience: string;
  status: string; // 'Open' | 'Closed' | 'Draft'
  department?: string;
  description?: string;
  requirements?: string[];
  isActive: boolean;
}

const CareerSchema = new Schema<ICareer>(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    location: { type: String, required: true },
    type: { type: String, required: true },
    experience: { type: String, required: true },
    status: { type: String, default: 'Open' },
    department: { type: String, default: 'Operations' },
    description: { type: String, default: '' },
    requirements: { type: [String], default: [] },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Career = mongoose.models.Career || mongoose.model<ICareer>('Career', CareerSchema);
