import mongoose, { Document, Schema } from 'mongoose';
export interface BrandEntity {
  name: string;
}
export interface CreateBrandRequest extends BrandEntity {}
export interface UpdateBrandRequest extends Partial<BrandEntity> {}

export interface BrandResponse extends BrandEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}
export interface BrandDoc extends BrandEntity, Document {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const brandSchema = new mongoose.Schema<BrandDoc>(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Brand = mongoose.model<BrandDoc>('Brand', brandSchema);

export default Brand;
