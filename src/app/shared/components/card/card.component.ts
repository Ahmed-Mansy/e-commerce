import { Component, inject, Input, OnInit } from '@angular/core';
import { Product } from '../../../features/home/models/product.interface';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { OnSalePipe } from '../../pipes/on-sale-pipe';
import { TermPipe } from '../../pipes/term-pipe';
import { CartService } from '../../../features/cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../features/wish-list/services/wishlist.service';
import { Wishlist } from '../../../features/wish-list/models/wishlist.interface';

@Component({
  selector: 'app-card',
  imports: [RouterLink, CurrencyPipe, TermPipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {
  @Input({ required: true }) product: Product = {} as Product;

  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  private readonly wishlistService = inject(WishlistService);

  // wishList: Wishlist[] = []



  ngOnInit(): void {
    // this.loadWishlist()
    this.wishlistService.loadWishlist();
  }

  addProductItemToCart(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);

        if (res.status === "success") {
          this.cartService.addToCart();
          this.toastrService.success(res.message, 'Trendy');
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }




  // addItemToWishlist(ProductId: string): void {

  //   if (this.wishList.some((item: any) => item._id === ProductId)) {
  //     // console.log('list', this.wishList)
  //     // console.log('id', this.ProductId)
  //     // console.log("already exist")
  //     this.toastrService.info('Already Exist');

  //     return;
  //   }

  //   this.wishlistService.addProductToWishlist(ProductId).subscribe({
  //     next: (res) => {
  //       // console.log(res)
  //       this.wishList = res.data
  //       // console.log(this.wishList)

  //       if (res.status === "success") {
  //         this.toastrService.success(res.message);
  //         this.loadWishlist()
  //       }
  //     }
  //   })


  // }


  // loadWishlist() {
  //   this.wishlistService.laodWishlistData().subscribe({
  //     next: (res) => {
  //       this.wishList = res.data
  //       console.log(this.wishList)
  //     }
  //   })
  // }

  toggleWishlist(productId: string): void {
    if (this.isInWishlist(productId)) {

      this.wishlistService.removeProductFromWishlist(productId).subscribe({
        next: (res) => {
          this.wishlistService.globalWishlist = res.data;
          this.toastrService.info('Removed from Wishlist');
          this.wishlistService.loadWishlist();
        }
      });
    } else {

      this.wishlistService.addProductToWishlist(productId).subscribe({
        next: (res) => {
          this.wishlistService.globalWishlist = res.data;
          this.toastrService.success('Added to Wishlist');
          this.wishlistService.loadWishlist();

        }
      });
    }
  }


  isInWishlist(productId: string): boolean {
    return this.wishlistService.globalWishlist.some((item: any) => item._id === productId);
  }

}
