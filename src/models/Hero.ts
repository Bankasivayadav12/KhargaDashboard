import mongoose, { Schema, Document } from 'mongoose';

export interface IHero extends Document {
  headline: string;
  subheadline: string;
  videoUrl: string;
  videoPoster: string;
  ctaText: string;
  ctaLink: string;
  showLogo: boolean;
  updatedAt: Date;
}

const HeroSchema = new Schema<IHero>(
  {
    headline: { type: String, required: true },
    subheadline: { type: String, default: '' },
    videoUrl: { type: String, required: true },
    videoPoster: { type: String, default: '' },
    ctaText: { type: String, default: 'GET STARTED' },
    ctaLink: { type: String, default: '/contact' },
    showLogo: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Hero = mongoose.models.Hero || mongoose.model<IHero>('Hero', HeroSchema);
