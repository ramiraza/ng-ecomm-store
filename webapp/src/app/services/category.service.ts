import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../interfaces/category.types';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  http = inject(HttpClient);
  constructor() {}

  getCategories(): Observable<any> {
    return this.http.get<Category[]>('http://localhost:3000/api/category');
  }

  addNewCategory(categoryName: string) {
    return this.http.post('http://localhost:3000/api/category', {
      name: categoryName,
    });
  }

  getCategoryById(id: string) {
    return this.http.get<Category>(`http://localhost:3000/api/category/${id}`);
  }

  updateCategoryById(categ: Category) {
    return this.http.put(`http://localhost:3000/api/category/${categ._id}`, {
      name: categ.name,
    });
  }

  deleteCategoryById(id: Pick<Category, '_id'>) {
    return this.http.delete(`http://localhost:3000/api/category/${id}`);
  }
}
