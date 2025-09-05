import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { InputComponent } from "../../../shared/components/input/input.component";
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  private readonly authService = inject(AuthService)
  private readonly fb = inject(FormBuilder)
  private readonly router = inject(Router)
  private readonly cookieService = inject(CookieService)

  subscription: Subscription = new Subscription;
  msgError: string = '';
  isLoading: boolean = false
  loginForm!: FormGroup

  ngOnInit(): void {
    this.initForm();
  }


  initForm(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]]
    })
  }

  submitForm() {

    if (this.loginForm.valid) {

      this.subscription.unsubscribe();

      this.isLoading = true
      this.subscription = this.authService.loginForm(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.message === "success") {
            this.msgError = '';
            this.cookieService.set('token', res.token)
            this.authService.decodeToken();
            setTimeout(() => {
              this.router.navigate(['/home'])
            }, 1000);


          }

          this.isLoading = false
        },
        error: (err) => {
          console.log(err);
          this.msgError = err.error.message
          this.isLoading = false

        }
      })

    }
  }

}
