import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../../../core/services/categories/categories.service';
import { Category } from '../../../../core/models/category.interface';

@Component({
  selector: 'app-popular-categories',
  imports: [],
  templateUrl: './popular-categories.component.html',
  styleUrl: './popular-categories.component.css'
})
export class PopularCategoriesComponent implements OnInit{
  private readonly categoriesService = inject(CategoriesService)
  categoriesList:Category[] = []

  ngOnInit(): void {
    this.getAllCategoriesData();
  }

  getAllCategoriesData():void{
    this.categoriesService.getAllcategories().subscribe({
      next:(res)=>{
        this.categoriesList= res.data
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
}
