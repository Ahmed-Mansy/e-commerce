import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from './services/wishlist.service';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { CartService } from '../cart/services/cart.service';
import { CartAnimationService } from '../../core/services/cart-animation.service';

@Component({
  selector: 'app-wish-list',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.css'
})
export class WishListComponent implements OnInit {

  private readonly wishlistService = inject(WishlistService)
  private readonly toastrService = inject(ToastrService)
  private readonly cartService = inject(CartService)
  private readonly cartAnimationService = inject(CartAnimationService)

  wishList = this.wishlistService.globalWishlist;

  ngOnInit(): void {
    this.wishlistService.loadWishlist()
  }

  removeItem(id: string): void {
    this.wishlistService.removeProductFromWishlist(id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.toastrService.info("Product removed successfully from your wishlist")
        }
        this.wishlistService.loadWishlist()
      }
    })
  }

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

}
