import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from './services/wishlist.service';
import { Wishlist } from './models/wishlist.interface';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wish-list',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.css'
})
export class WishListComponent implements OnInit {

  private readonly wishlistService = inject(WishlistService)
  private readonly toastrService = inject(ToastrService)

  wishList: Wishlist[] = []

  ngOnInit(): void {
    this.loadWishlist()
  }

  loadWishlist() {
    this.wishlistService.laodWishlistData().subscribe({
      next: (res) => {
        this.wishList = res.data
        console.log(this.wishList)
      }
    })
  }


  removeItem(id: string): void {
    this.wishlistService.removeProductFromWishlist(id).subscribe({
      next: (res) => {
        console.log(res)
        if (res.status === 'success') {
          this.toastrService.info("Product removed successfully from your wishlist")
        }
        this.loadWishlist()
      }
    })
  }

}
