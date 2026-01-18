import mongoose, { Document, Schema } from "mongoose";

export interface ClassDocument extends Document {
  name: string;
  subjectId: mongoose.Types.ObjectId;
  departmentId: mongoose.Types.ObjectId;
  teacherId: mongoose.Types.ObjectId;
  studentIds: mongoose.Types.ObjectId[];
  inviteCode: string;
  capacity: number;
  description?: string;
  status: "active" | "inactive" | "archived" | "completed";
  schedules: {
    dayOfWeek: number;
    startTime: string;
    endTime: string;
  }[];
  banner?: string;
  createdAt: Date;
  updatedAt: Date;
}

const classSchema = new Schema<ClassDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
    studentIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
    inviteCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    capacity: {
      type: Number,
      required: true,
      min: 1,
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "archived", "completed"],
      default: "active",
    },
    schedules: [
      {
        dayOfWeek: {
          type: Number,
          required: true,
          min: 0,
          max: 6,
        },
        startTime: {
          type: String,
          required: true,
        },
        endTime: {
          type: String,
          required: true,
        },
      },
    ],
    banner: {
      type: String,
      required: false,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

classSchema.index({ inviteCode: 1 }, { unique: true });
classSchema.index({ subjectId: 1 });
classSchema.index({ teacherId: 1 });

const Class = mongoose.model<ClassDocument>("Class", classSchema);

export default Class;
