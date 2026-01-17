import mongoose, { Document, Schema } from "mongoose";

export interface EnrollmentDocument extends Document {
  studentId: mongoose.Types.ObjectId;
  classId: mongoose.Types.ObjectId;
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
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
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

enrollmentSchema.index({ studentId: 1, classId: 1 }, { unique: true });
enrollmentSchema.index({ classId: 1 });

const Enrollment = mongoose.model<EnrollmentDocument>(
  "Enrollment",
  enrollmentSchema,
);

export default Enrollment;
