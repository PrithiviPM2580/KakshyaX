import mongoose, { Document, Schema } from "mongoose";

export interface SubjectDocument extends Document {
  departmentId: mongoose.Types.ObjectId;
  name: string;
  code: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const subjectSchema = new Schema<SubjectDocument>(
  {
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

subjectSchema.index({ code: 1 }, { unique: true });
subjectSchema.index({ departmentId: 1 });

const Subject = mongoose.model<SubjectDocument>("Subject", subjectSchema);

export default Subject;
