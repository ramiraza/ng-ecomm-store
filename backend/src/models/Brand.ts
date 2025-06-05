import mongoose, { Document } from 'mongoose';

export interface BrandDto {
  name: string;
}

interface BrandDoc extends BrandDto, Document {}

const brandSchema = new mongoose.Schema<BrandDoc>({
  name: String,
});

export const Brand = mongoose.model('Brand', brandSchema);
