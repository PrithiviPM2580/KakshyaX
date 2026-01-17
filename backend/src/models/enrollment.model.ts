import mongoose, { Document, Schema } from "mongoose";

export interface EnrollmentDocument extends Document {
  studentId: mongoose.Types.ObjectId;
  subjectId: mongoose.Types.ObjectId;
  enrollmentDate: Date;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const enrollmentSchema = new Schema<EnrollmentDocument>(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    enrollmentDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["active", "completed", "dropped"],
      default: "active",
    },
  },
  {
    timestamps: true,
  },
);

enrollmentSchema.index({ studentId: 1, subjectId: 1 }, { unique: true });
enrollmentSchema.index({ subjectId: 1 });

const Enrollment = mongoose.model<EnrollmentDocument>(
  "Enrollment",
  enrollmentSchema,
);

export default Enrollment;
