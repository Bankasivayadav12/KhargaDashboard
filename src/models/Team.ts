import mongoose, { Schema, Document } from 'mongoose';

export interface ITeamMember extends Document {
  id: string;
  name: string;
  role: string;
  photo: string;
  isFounder: boolean;
  order: number;
  curveStyle?: string;
}

const TeamMemberSchema = new Schema<ITeamMember>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    role: { type: String, required: true },
    photo: { type: String, required: true },
    isFounder: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    curveStyle: { type: String, default: 'none' },
  },
  { timestamps: true }
);

export const TeamMember = mongoose.models.TeamMember || mongoose.model<ITeamMember>('TeamMember', TeamMemberSchema);
