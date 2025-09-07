import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';
import { Cart } from './models/cart.interface';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit, OnDestroy {

  private readonly cartService = inject(CartService)
  private readonly toastrService = inject(ToastrService)
  private readonly ngxSpinnerService = inject(NgxSpinnerService)

  cartDetails: Cart = {} as Cart


  ngOnInit(): void {
    this.getLoggedUserData()
    this.cartService.loadCart();

  }

  getLoggedUserData(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        console.log(`getLogged`, res.data);
        this.cartDetails = res.data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  removeItem(id: string): void {
    this.cartService.removeSpecificCartItem(id).subscribe({
      next: (res) => {
        this.cartDetails = res.data;
        this.toastrService.error('Item deleted successfully')
        this.cartService.removeFromCart();
        this.cartService.loadCart();

      },
      error: (err) => {
        console.log(err)
      }
    })
  }


  updateProduct(id: string, count: number): void {
    this.cartService.updateCartCount(id, count).subscribe({
      next: (res) => {
        this.cartDetails = res.data;
        this.toastrService.info('Done')
        if (this.cartDetails.products.length === 0) {
          this.cartService.resetCart()
        }
        this.cartService.loadCart();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  animateFun(): void {
    this.ngxSpinnerService.show()

  }
  ngOnDestroy(): void {
    setTimeout(() => {
      this.ngxSpinnerService.hide()

    }, 1400);
  }
}
