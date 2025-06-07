import { Types } from 'mongoose';
import { Category, CategoryData, CategoryDoc } from '@models';

export const getCategories = async (): Promise<CategoryDoc[] | void> => {
  try {
    return await Category.find();
  } catch (error) {
    console.log(error);
  }
};

export const getCategoryById = async (id: string) => {
  let category = await Category.findById(id);
  return category?.toObject();
};

export const addCategory = async (
    data: CategoryData
): Promise<CategoryData | void> => {
  let category = new Category({
    name: data.name,
  });
  await category.save();
  return category.toObject();
};

export async function updateCategory(
    id: string,
    data: CategoryData
): Promise<CategoryData | null> {
  if (!Types.ObjectId.isValid(id)) {
    throw new Error('Invalid category ID format');
  }
  try {
    const result = await Category.findByIdAndUpdate(
        id,
        {
          name: data.name,
        },
        {
          new: true,
          runValidators: true,
        }
    );
    return result ? (result as CategoryData) : null;
  } catch (error) {
    throw new Error(`Failed to update category ${error}`);
  }
}

export const deleteCategory = async (
    id: string
): Promise<CategoryData | null> => {
  if (!Types.ObjectId.isValid(id)) {
    throw new Error('Invalid category ID format');
  }
  try {
    const result = await Category.findByIdAndDelete(id);
    return result ? (result.toObject() as CategoryData) : null;
  } catch (error) {
    throw new Error(`Failed to delete category: ${error}`);
  }
};
