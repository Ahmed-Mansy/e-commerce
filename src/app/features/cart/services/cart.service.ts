import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly httpClient = inject(HttpClient)
  private readonly cookieService = inject(CookieService)

  myHeaders = {
    headers: {
      token: this.cookieService.get('token')
    }
  };

  addProductToCart(id: string): Observable<any> {

    return this.httpClient.post(environment.baseUrl + `cart`, {
      productId: id
    },
      this.myHeaders


    )
  }

}
