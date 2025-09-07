import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from "../../../shared/components/input/input.component";
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-forgot-pasword',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './forgot-pasword.component.html',
  styleUrl: './forgot-pasword.component.css'
})
export class ForgotPaswordComponent implements OnInit {

  private readonly fb = inject(FormBuilder)
  private readonly authService = inject(AuthService)
  private readonly cookieService = inject(CookieService)
  private readonly router = inject(Router)

  step: number = 1

  verifyEmail !: FormGroup;
  verifyCode !: FormGroup;
  resetPassword !: FormGroup;


  ngOnInit(): void {
    this.initForm()
  }


  initForm(): void {

    this.verifyEmail = this.fb.group({
      email: [null, [Validators.required, Validators.email]]
    });
    this.verifyCode = this.fb.group({
      resetCode: [null, [Validators.required]]
    });
    this.resetPassword = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      newPassword: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
    })
  }




  submitStep1(): void {
    if (this.verifyEmail.valid) {
      this.authService.submitVerifyEmail(this.verifyEmail.value).subscribe({
        next: (res) => {
          console.log(res);
          this.step = 2;
        }
      })
    }
  }

  submitStep2(): void {
    if (this.verifyCode.valid) {
      this.authService.submitVerifyCode(this.verifyCode.value).subscribe({
        next: (res) => {
          console.log(res);
          this.step = 3;
        }
      })
    }
  }

  submitStep3(): void {
    if (this.resetPassword.valid) {
      this.authService.submitResetPassword(this.resetPassword.value).subscribe({
        next: (res) => {
          console.log(res);
          this.cookieService.set('token', res.token)
          this.router.navigate(['/home'])

        }
      })
    }
  }



}
