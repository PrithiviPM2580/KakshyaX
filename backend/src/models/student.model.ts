import mongoose, { Document, Schema } from "mongoose";

export interface StudentDocument extends Document {
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const studentSchema = new Schema<StudentDocument>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  },
);

studentSchema.index({ email: 1 }, { unique: true });

const Student = mongoose.model<StudentDocument>("Student", studentSchema);

export default Student;
