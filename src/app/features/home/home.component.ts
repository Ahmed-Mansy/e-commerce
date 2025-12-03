import { Component, inject, OnInit } from '@angular/core';
import { MainSliderComponent } from "./components/main-slider/main-slider.component";
import { PopularCategoriesComponent } from "./components/popular-categories/popular-categories.component";
import { PopularProductsComponent } from "./components/popular-products/popular-products.component";
import { WishlistService } from '../wish-list/services/wishlist.service';

@Component({
  selector: 'app-home',
  imports: [MainSliderComponent, PopularCategoriesComponent, PopularProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  private readonly wishlistService = inject(WishlistService)


  ngOnInit(): void {
    this.wishlistService.loadWishlist();
  }

}
