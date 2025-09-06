import { Component, inject, Input } from '@angular/core';
import { Product } from '../../../features/home/models/product.interface';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { OnSalePipe } from '../../pipes/on-sale-pipe';
import { TermPipe } from '../../pipes/term-pipe';
import { CartService } from '../../../features/cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-card',
  imports: [RouterLink, CurrencyPipe, TermPipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input({ required: true }) product: Product = {} as Product;

  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);


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


}
