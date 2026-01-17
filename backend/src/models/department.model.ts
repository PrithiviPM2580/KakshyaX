import mongoose, { Document, Schema } from "mongoose";

export interface DepartmentDocument extends Document {
  code: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const departmentSchema = new Schema<DepartmentDocument>(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
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

departmentSchema.index({ code: 1 }, { unique: true });

const Department = mongoose.model<DepartmentDocument>(
  "Department",
  departmentSchema,
);

export default Department;
