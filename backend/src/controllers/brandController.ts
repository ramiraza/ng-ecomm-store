import Brand, { BrandDoc } from '@models/Brand';
// get all the brands
export const getAllBrands = async (): Promise<BrandDoc[] | null> => {
  try {
    const brands: BrandDoc[] = await Brand.find();
    return brands.length > 0 ? brands : null;
  } catch (err: unknown) {
    console.error('Error fetching brands:', err);
    throw new Error(`${err instanceof Error ? err.message : 'Unknown error'}`);
  }
};

export const getBrandById = async (id: string): Promise<BrandDoc | null> => {
  return await Brand.findById(id);
};
