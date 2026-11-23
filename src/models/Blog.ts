import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
  id: string;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
  content: {
    intro: string[];
    sections: {
      heading: string;
      subheading?: string;
      paragraphs: string[];
      bullets?: string[];
    }[];
    checklistTitle?: string;
    checklistSubtitle?: string;
    checklistItems?: string[];
    finalThoughtsHeading?: string;
    finalThoughtsText?: string[];
    ctaHeading?: string;
    ctaText?: string[];
  };
  isActive: boolean;
}

const BlogSchema = new Schema<IBlog>(
  {
    id: { type: String, required: true, unique: true },
    slug: { type: String, required: true },
    category: { type: String, required: true },
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    image: { type: String, required: true },
    date: { type: String, required: true },
    readTime: { type: String, required: true },
    content: {
      intro: { type: [String], default: [] },
      sections: [
        {
          heading: { type: String, required: true },
          subheading: { type: String },
          paragraphs: { type: [String], default: [] },
          bullets: { type: [String], default: [] },
        },
      ],
      checklistTitle: { type: String },
      checklistSubtitle: { type: String },
      checklistItems: { type: [String], default: [] },
      finalThoughtsHeading: { type: String },
      finalThoughtsText: { type: [String], default: [] },
      ctaHeading: { type: String },
      ctaText: { type: [String], default: [] },
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Blog = mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);
