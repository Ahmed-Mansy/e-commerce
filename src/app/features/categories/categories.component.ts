import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Category } from '../../core/models/category.interface';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService)

  categriesList: Category[] = []



  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(): void {
    this.categoriesService.getAllcategories().subscribe({
      next: (res) => {
        this.categriesList = res.data;
        console.log(this.categriesList);
      }

    })
  }






}
