import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private readonly httpClient = inject(HttpClient)
  private readonly cookieService = inject(CookieService)


  getUserOrders(id: string): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `orders/user/${id}`)
  }


}
