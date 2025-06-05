import mongoose, { Document, Schema, Types } from 'mongoose';

export interface CategoryData {
  _id?: Types.ObjectId;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CategoryDoc extends CategoryData, Document {
  _id: Types.ObjectId;
}

const categorySchema = new Schema<CategoryDoc>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);
export const Category = mongoose.model<CategoryDoc>('Category', categorySchema);
export type CategoryID = Pick<CategoryDoc, '_id'>;
