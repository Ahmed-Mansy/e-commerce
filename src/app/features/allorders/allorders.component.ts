import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth/services/auth.service';
import { OrdersService } from './services/orders.service';
import { Order } from './models/order.interface';

@Component({
  selector: 'app-allorders',
  imports: [],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css'
})
export class AllordersComponent implements OnInit {

  private readonly authService = inject(AuthService)
  private readonly ordersService = inject(OrdersService)

  userId!: string | null
  allOrders!: Order[]

  ngOnInit(): void {
    this.getAllOrders();
  }


  getAllOrders(): void {



    this.ordersService.getUserOrders(this.authService.decodeToken()).subscribe({
      next: (res) => {
        this.allOrders = res
        console.log(this.allOrders);
      },
      error: (err) => {
        console.log(err)
      }
    })

  }



}
