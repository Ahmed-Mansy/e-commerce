import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private readonly httpClient = inject(HttpClient)

  getAllcategories(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `categories`)
  }
  getAllSubCategories(id: string | null): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `categories/${id}/subcategories`)
  }

}
