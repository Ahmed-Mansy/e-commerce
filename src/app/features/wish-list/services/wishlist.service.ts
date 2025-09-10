import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { Wishlist } from '../models/wishlist.interface';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private readonly httpClient = inject(HttpClient)

  globalWishlist: Wishlist[] = []

  addProductToWishlist(id: string): Observable<any> {
    return this.httpClient.post(environment.baseUrl + `wishlist`,
      {
        productId: id
      }
    )
  }

  removeProductFromWishlist(id: string): Observable<any> {
    return this.httpClient.delete(environment.baseUrl + `wishlist/${id}`)
  }


  laodWishlistData(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `wishlist`);
  }





  loadWishlist() {
    this.laodWishlistData().subscribe({
      next: (res) => {
        this.globalWishlist = res.data
        console.log('golbal from Service ', this.globalWishlist)
      }
    })
  }

}
