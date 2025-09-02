import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms"
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

registerForm = new FormGroup({
  name: new FormControl(null , [Validators.required , Validators.minLength(3) , Validators.maxLength(20)]),
  email: new FormControl(null , [Validators.required, Validators.email]),
  password: new FormControl(null , [Validators.required , Validators.pattern(/^\w{6,}$/)]),
  rePassword: new FormControl(null , [Validators.required , Validators.pattern(/^\w{6,}$/)]),
  phone: new FormControl(null , [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
})



submitForm():void{
  console.log(this.registerForm)
}
}
