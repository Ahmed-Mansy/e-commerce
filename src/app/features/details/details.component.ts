import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailsService } from './services/product-details.service';
import { Product } from '../home/models/product.interface';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CurrencyPipe, PercentPipe } from '@angular/common';
import { CartService } from '../cart/services/cart.service';
import { WishlistService } from '../wish-list/services/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { CartAnimationService } from '../../core/services/cart-animation.service';

@Component({
  selector: 'app-details',
  imports: [CarouselModule, CurrencyPipe],
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
    autoplay: true,
    autoplayHoverPause: true,
    autoplayTimeout: 1500,
    navSpeed: 700,
    navText: ['prev', 'next'],
    items: 1,
    nav: true
  }

  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly productDetailsService = inject(ProductDetailsService)
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  private readonly toastrService = inject(ToastrService);
  private readonly cartAnimationService = inject(CartAnimationService);

  id: string | null = null
  productDetails: Product = {} as Product

  ngOnInit(): void {
    this.getProductId()
    this.getProductDetailsData()
  }

  getProductId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (urlParam) => {
        this.id = urlParam.get('id');
      }
    })
  }

  getProductDetailsData(): void {
    this.productDetailsService.getProductDetails(this.id).subscribe({
      next: (res) => {
        this.productDetails = res.data
      },
      error: (err) => {
        console.log(err)
      }
    })
  };

  addProductItemToCart(id: string, event: MouseEvent): void {
    this.cartAnimationService.animateToCart(event);
    
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        if (res.status === "success") {
          this.cartService.cartCount.set(res.numOfCartItems);
          this.toastrService.success(res.message, 'Trendify');
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


  toggleWishlist(productId: string): void {
    if (this.isInWishlist(productId)) {
      this.wishlistService.removeProductFromWishlist(productId).subscribe({
        next: (res) => {
          this.toastrService.info('Removed from Wishlist');
          this.wishlistService.loadWishlist();
        }
      });
    } else {
      this.wishlistService.addProductToWishlist(productId).subscribe({
        next: (res) => {
          this.toastrService.success('Added to Wishlist');
          this.wishlistService.loadWishlist();
        }
      });
    }
  }

  isInWishlist(productId: string): boolean {
    return this.wishlistService.globalWishlist().some(
      (item: any) => item._id === productId
    );
  }

}
