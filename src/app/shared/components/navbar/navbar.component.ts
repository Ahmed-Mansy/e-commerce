import { Component, inject, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FlowbiteService } from '../../../core/services/flowbite.service';
import { initFlowbite } from 'flowbite';
import { AuthService } from '../../../core/auth/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartService } from '../../../features/cart/services/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private flowbiteService: FlowbiteService) { }
  private readonly authService = inject(AuthService)
  private readonly ngxSpinnerService = inject(NgxSpinnerService)
  private readonly cartService = inject(CartService)
  @Input({ required: true }) isLogin: boolean = true;
  cartCount = 0;

  ngOnInit(): void {

    this.cartService.cartCount$.subscribe((count) => {
      this.cartCount = count
    })


    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }

  signOut(): void {
    this.ngxSpinnerService.show();

    setTimeout(() => {
      this.ngxSpinnerService.hide();
      this.authService.logout()
    }, 1000);



  }

}
