import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { jwtDecode, JwtPayload } from "jwt-decode";


interface MyToken extends JwtPayload {
  id: string;
  name: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {



  private readonly httpClient = inject(HttpClient)
  private readonly cookieService = inject(CookieService)
  private readonly router = inject(Router)

  registerForm(data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + `auth/signup`, data)
  }


  loginForm(data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + `auth/signin`, data)
  }

  logout(): void {

    this.cookieService.delete('token')
    this.router.navigate(['/login'])

  }


  decodeToken(): string {
    try {
      const tokenString = this.cookieService.get('token');
      if (!tokenString) {
        this.logout();
        return ""; // string فاضي بدل null
      }
      const token = jwtDecode<MyToken>(tokenString);
      return token.id;
    } catch (error) {
      this.logout();
      return "";
    }
  }

}
