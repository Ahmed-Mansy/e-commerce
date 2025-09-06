import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from "../../shared/components/input/input.component";
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../cart/services/cart.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  private readonly fb = inject(FormBuilder)
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly cartService = inject(CartService)

  checkOutForm!: FormGroup
  cardId: string | null = null;

  ngOnInit(): void {
    this.initForm();
    this.getCartId()
  }
  initForm(): void {
    this.checkOutForm = this.fb.group({
      shippingAddress: this.fb.group({
        details: [null, [Validators.required]],
        phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
        city: [null, [Validators.required]]
      })
    })
  }


  getCartId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (urlParam) => {
        this.cardId = urlParam.get('id');
      }
    })
  }

  submitForm(e: any): void {

    if (this.checkOutForm.valid && e.target.id === 'visa') {
      console.log('visa')
      this.cartService.checkoutSessionVisa(this.cardId, this.checkOutForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.status === 'success') {
            window.open(res.session.url, '_self')
          }
        },
        error: (err) => {
          console.log(err)
        }
      })
    }
    else if (this.checkOutForm.valid && e.target.id === 'cash') {
      console.log('cash')
      this.cartService.checkoutSessionCash(this.cardId, this.checkOutForm.value).subscribe({
        next: (res) => {
          console.log(res);
        }
      })

    }
  }




}
