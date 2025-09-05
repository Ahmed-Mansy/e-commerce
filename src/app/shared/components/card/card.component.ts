import { Component, Input } from '@angular/core';
import { Product } from '../../../features/home/models/product.interface';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { OnSalePipe } from '../../pipes/on-sale-pipe';
import { TermPipe } from '../../pipes/term-pipe';

@Component({
  selector: 'app-card',
  imports: [RouterLink, CurrencyPipe, OnSalePipe, TermPipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input({ required: true }) product: Product = {} as Product
}
