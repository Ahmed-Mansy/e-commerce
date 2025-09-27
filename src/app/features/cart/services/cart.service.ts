import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly httpClient = inject(HttpClient)
  private readonly cookieService = inject(CookieService)

  cartCount: WritableSignal<number> = signal(0);
  // cartCount$ = this.cartCount.asObservable();

  addToCart(): void {
    this.cartCount.update((value) => value + 1)
  }
  removeFromCart(): void {
    this.cartCount.update((value) => value - 1)
    if (this.cartCount() === 0) {
      this.resetCart()
    }
  }
  resetCart() {
    this.cartCount.set(0);
  }

  loadCart(): void {
    this.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cartCount.set(res.numOfCartItems)
      }
    })
  }


  addProductToCart(id: string): Observable<any> {

    return this.httpClient.post(environment.baseUrl + `cart`, {
      productId: id
    },



    )
  }

  getLoggedUserCart(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `cart`,

    )
  }

  removeSpecificCartItem(id: string): Observable<any> {
    return this.httpClient.delete(environment.baseUrl + `cart/${id}`,

    )
  }

  updateCartCount(id: string, count: number): Observable<any> {
    return this.httpClient.put(environment.baseUrl + `cart/${id}`,
      {
        count: count
      },

    )
  }

  checkoutSessionVisa(id: string | null, data: object): Observable<any> {

    return this.httpClient.post(environment.baseUrl + `orders/checkout-session/${id}?url=http://localhost:4200`, data,)
  };


  checkoutSessionCash(id: string | null, data: object): Observable<any> {

    return this.httpClient.post(environment.baseUrl + `orders/${id}`, data,)
  }


}
