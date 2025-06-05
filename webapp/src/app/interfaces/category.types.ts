export interface Category {
  _id?: string;
  name: string;
}

export interface CategoryDoc extends Category {
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CategoryResponse {
  message: string;
  categories: CategoryDoc[];
}
