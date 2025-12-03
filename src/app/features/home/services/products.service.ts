import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { IResponse, Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly httpClient = inject(HttpClient)

  getAllProducts(pageNum: number = 1): Observable<IResponse<Product[]>> {
    return this.httpClient.get<IResponse<Product[]>>(environment.baseUrl + `products?page=${pageNum}`)
  }

}
