import mongoose, { Schema, Document } from 'mongoose';

export interface IWhyChoose extends Document {
  id: string;
  title: string;
  description: string;
  image: string;
  order: number;
  isActive: boolean;
}

const WhyChooseSchema = new Schema<IWhyChoose>(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const WhyChoose = mongoose.models.WhyChoose || mongoose.model<IWhyChoose>('WhyChoose', WhyChooseSchema);
