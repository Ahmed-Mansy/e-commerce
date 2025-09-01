import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from "../../../../shared/components/card/card.component";
import { Product } from '../../models/product.interface';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-popular-products',
  imports: [CardComponent],
  templateUrl: './popular-products.component.html',
  styleUrl: './popular-products.component.css'
})
export class PopularProductsComponent implements OnInit{

  
private readonly productsService = inject(ProductsService)
productList:Product[] = []
ngOnInit(): void {
    this.getAllProductsData()
}

  getAllProductsData():void{
    this.productsService.getAllProducts().subscribe({
      next:(res)=>{
        this.productList = res.data
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

}
