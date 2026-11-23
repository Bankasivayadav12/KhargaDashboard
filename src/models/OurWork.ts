import mongoose, { Schema, Document } from 'mongoose';

export interface IOurWork extends Document {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  client: string;
  year: string;
  link: string;
  order: number;
  isFeatured: boolean;
}

const OurWorkSchema = new Schema<IOurWork>(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, default: '' },
    image: { type: String, required: true },
    client: { type: String, default: '' },
    year: { type: String, default: '2025' },
    link: { type: String, default: '/portfolio' },
    order: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const OurWork = mongoose.models.OurWork || mongoose.model<IOurWork>('OurWork', OurWorkSchema);
