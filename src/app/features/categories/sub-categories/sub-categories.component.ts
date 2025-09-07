import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../../../core/services/categories/categories.service';
import { Category } from '../../../core/models/category.interface';

@Component({
  selector: 'app-sub-categories',
  imports: [],
  templateUrl: './sub-categories.component.html',
  styleUrl: './sub-categories.component.css'
})
export class SubCategoriesComponent implements OnInit {

  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly categoriesService = inject(CategoriesService)


  categoryId: string | null = null;
  categoryName: string | null = null;

  subCategriesList: Category[] = []



  ngOnInit(): void {
    this.getCategoryId();
    this.getAllSubcategories()

  }



  getCategoryId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (urlParam) => {

        this.categoryId = urlParam.get('id');
        this.categoryName = urlParam.get('slug');
        console.log(this.categoryId)
        console.log(this.categoryName)
      }
    })

  }


  getAllSubcategories(): void {
    this.categoriesService.getAllSubCategories(this.categoryId).subscribe({
      next: (res) => {
        this.subCategriesList = res.data
        console.log(this.subCategriesList);
        console.log(res);

      }
    })
  }






}
