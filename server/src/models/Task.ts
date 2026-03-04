import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  title: string;
  date: string; // ISO date string YYYY-MM-DD
  order: number;
  labels: string[];
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true, trim: true },
    date: { type: String, required: true, index: true },
    order: { type: Number, required: true, default: 0 },
    labels: { type: [String], default: [] },
  },
  { timestamps: true }
);

TaskSchema.index({ date: 1, order: 1 });

export const Task = mongoose.model<ITask>("Task", TaskSchema);
