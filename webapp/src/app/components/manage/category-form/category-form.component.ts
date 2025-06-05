import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CategoryService } from '../../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category, CategoryResponse } from '../../../interfaces/category.types';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatInputModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss',
})
export class CategoryFormComponent implements OnInit {
  categoryService = inject(CategoryService);
  name: string = '';
  router = inject(Router);
  route = inject(ActivatedRoute);
  inEditMode: boolean = false;
  categoryId: string = '';

  ngOnInit(): void {
    const id = this.route.snapshot.params['id']; // This can be string | undefined
    if (id) {
      // Type guard - ensures id is string inside this block
      this.inEditMode = true;
      this.categoryId = id; // Now TypeScript knows id is definitely a string

      this.categoryService.getCategoryById(id).subscribe({
        next: (data) => {
          if (data && data._id) {
            this.name = data.name; // Set the name for editing
            this.categoryId = data._id;
          }
        },
        error: (err) => {
          console.error('Error loading category:', err);
          alert('Failed to load category');
        },
      });
    }
  }

  add() {
    if (!this.name) {
      alert('Category name is required.');
      return;
    }
    this.categoryService.addNewCategory(this.name).subscribe({
      next: () => {
        alert(`Category Added: ${this.name}`);
        this.router.navigateByUrl('/admin/categories');
      },
      error: (err) => console.error(err),
    });
  }

  update() {
    if (this.name) {
      this.categoryService
        .updateCategoryById({ _id: this.categoryId, name: this.name })
        .subscribe({
          next: (result) => {
            if (result) {
              console.log('updated category:', result);
            }
          },
          error: (err) => console.error(err),
        });
    }
  }
}
