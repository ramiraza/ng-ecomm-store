import {
  AfterViewInit,
  Component,
  inject,
  ViewChild,
  OnInit,
} from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CategoryService } from '../../../services/category.service';
import { Category, CategoryResponse } from '@interfaces/category.types';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    RouterModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'action'];
  dataSource: MatTableDataSource<Category>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  categoryService = inject(CategoryService);

  constructor() {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource<Category>([]);
  }

  ngOnInit() {
    this.loadCategories();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data: CategoryResponse) => {
        // Assign the categories array, not the entire response
        this.dataSource.data = data.categories;
      },
      error: (error) => {
        console.error('Error loading categories:', error);
        this.dataSource.data = [];
      },
    });
  }

  deleteCategory(id: Pick<Category, '_id'>) {
    this.categoryService.deleteCategoryById(id).subscribe({
      next: () => {
        console.log('deleted successfully');
        this.loadCategories();
      },
      error(err) {
        console.error(err);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
