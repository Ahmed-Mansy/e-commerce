import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../../../core/services/categories/categories.service';
import { Category } from '../../../../core/models/category.interface';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-popular-categories',
  imports: [CarouselModule ],
  templateUrl: './popular-categories.component.html',
  styleUrl: './popular-categories.component.css'
})
export class PopularCategoriesComponent implements OnInit{
  private readonly categoriesService = inject(CategoriesService)
  categoriesList:Category[] = []


   categroriesOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay:true,
    autoplayTimeout:3500,
    autoplayHoverPause:true,
    navSpeed: 700,
    margin:10,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      },
      1100: {
        items: 6
      },
    },
    nav: false
  }


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
