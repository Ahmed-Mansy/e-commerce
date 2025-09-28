import { Component, computed, inject, input, Input, InputSignal, PLATFORM_ID, Signal, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FlowbiteService } from '../../../core/services/flowbite.service';
import { initFlowbite } from 'flowbite';
import { AuthService } from '../../../core/auth/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartService } from '../../../features/cart/services/cart.service';
import { isPlatformBrowser } from '@angular/common';
import { WishlistService } from '../../../features/wish-list/services/wishlist.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  private readonly id = inject(PLATFORM_ID)
  constructor(private flowbiteService: FlowbiteService) { }
  private readonly authService = inject(AuthService)
  private readonly ngxSpinnerService = inject(NgxSpinnerService)
  private readonly cartService = inject(CartService)
  private readonly wishlistService = inject(WishlistService);

  // @Input({ required: true }) isLogin: boolean = true;
  isLoginn: InputSignal<boolean> = input(true)
  cartCount: Signal<number> = computed(() => this.cartService.cartCount());

  ngOnInit(): void {

    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
    // this.getCartNumber();

    if (isPlatformBrowser(this.id) && this.isLoginn()) {
      this.cartService.loadCart();
      this.wishlistService.loadWishlist();

    }

  }


  // getCartNumber(): void {
  //   this.cartService.cartCount$.subscribe({
  //     next: (value) => {
  //       this.cartCount = value;
  //     }
  //   })
  // }


  signOut(): void {
    this.ngxSpinnerService.show();

    setTimeout(() => {
      this.ngxSpinnerService.hide();
      this.authService.logout()
    }, 1000);



  }

}
