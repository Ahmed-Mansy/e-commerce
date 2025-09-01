import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailsService } from './services/product-details.service';
import { Product } from '../home/models/product.interface';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-details',
  imports: [CarouselModule ],
templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {

    productOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay:true,
    autoplayHoverPause:true,
    autoplayTimeout:1500,
    navSpeed: 700,
    navText: ['prev', 'next'],
    items:1,
    nav: true
  }

  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly productDetailsService = inject(ProductDetailsService)
  id:string | null= null
  productDetails:Product = {} as Product

  ngOnInit(): void {
      this.getProductId()
      this.getProductDetailsData()
  }
  
  getProductId():void{
    this.activatedRoute.paramMap.subscribe({
      next:(urlParam)=>{
        this.id = urlParam.get('id');
      }
    })
  }

  getProductDetailsData():void{
    this.productDetailsService.getProductDetails(this.id).subscribe({
      next:(res)=>{
        this.productDetails =res.data
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
}
