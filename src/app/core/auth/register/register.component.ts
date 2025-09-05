import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { InputComponent } from "../../../shared/components/input/input.component";


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)
  private readonly fb = inject(FormBuilder)

  msgError: string = '';
  isLoading: boolean = false


  registerForm!: FormGroup

  ngOnInit(): void {
    this.initForm()
  }


  initForm(): void {
    this.registerForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
      rePassword: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
      phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]]
    }, { validators: this.confirmPassword })

  }

  confirmPassword(group: AbstractControl) {

    if (group.get('password')?.value === group.get('rePassword')?.value) {
      return null
    }

    else {
      group.get('rePassword')?.setErrors({ mismatch: true })
    }
    return { mismatch: true }

  }

  submitForm(): void {
    if (this.registerForm.valid) {
      this.isLoading = true

      this.authService.registerForm(this.registerForm.value).subscribe({
        next: (res) => {
          console.log(res);

          if (res.message === "success") {
            this.msgError = '';
            setTimeout(() => {
              this.router.navigate(['/login'])
            }, 1000);


          }
          this.isLoading = false
        },
        error: (err) => {
          console.log(err)
          this.msgError = err.error.message;
          this.isLoading = false



        }
      })


    }
    else {
      this.registerForm.setErrors({ mismatch: true })
      this.registerForm.markAllAsTouched()
    }
  }
}
