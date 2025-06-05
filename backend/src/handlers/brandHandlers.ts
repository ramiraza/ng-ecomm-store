import { BrandDto, Brand } from '@models';

export const getBrands = async (): Promise<BrandDto[] | [] | void> => {
  const brands$ = await Brand.find({});
};
