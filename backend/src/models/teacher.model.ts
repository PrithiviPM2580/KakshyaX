import mongoose, { Document, Schema } from "mongoose";

export interface TeacherDocument extends Document {
  firstnamme: string;
  lastName: string;
  email: string;
  departmentId: mongoose.Types.ObjectId;
  subjects: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const teacherSchema = new Schema<TeacherDocument>(
  {
    firstnamme: {
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
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    subjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
      },
    ],
  },
  {
    timestamps: true,
  },
);

teacherSchema.index({ email: 1 }, { unique: true });
teacherSchema.index({ departmentId: 1 });

const Teacher = mongoose.model<TeacherDocument>("Teacher", teacherSchema);

export default Teacher;
