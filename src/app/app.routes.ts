import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './core/layouts/blank-layout/blank-layout.component';
import { LoginComponent } from './core/auth/login/login.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { HomeComponent } from './features/home/home.component';
import { ProductsComponent } from './features/products/products.component';
import { CartComponent } from './features/cart/cart.component';
import { CategoriesComponent } from './features/categories/categories.component';
import { BrandsComponent } from './features/brands/brands.component';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { DetailsComponent } from './features/details/details.component';
import { NotfoundComponent } from './features/notfound/notfound.component';
import { authGuard } from './core/guards/auth-guard';
import { isLoggedGuard } from './core/guards/is-logged-guard';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: '', component: AuthLayoutComponent, canActivate: [isLoggedGuard], children: [
            { path: 'login', component: LoginComponent, title: 'Login Page' },
            { path: 'register', component: RegisterComponent, title: 'Register Page' },
        ]
    },
    {
        path: '', component: BlankLayoutComponent,
        canActivate: [authGuard],
        children: [
            { path: 'home', component: HomeComponent, title: 'Home Page' },
            { path: 'products', component: ProductsComponent, title: 'Products Page' },
            { path: 'cart', component: CartComponent, title: 'Cart Page' },
            { path: 'categories', component: CategoriesComponent, title: 'Categories Page' },
            { path: 'brands', component: BrandsComponent, title: 'Brands Page' },
            { path: 'checkout', component: CheckoutComponent, title: 'Checkout Page' },
            { path: 'details/:slug/:id', component: DetailsComponent, title: 'Details Page' },
            { path: '**', component: NotfoundComponent, title: 'NotFound Page' }
        ]
    },
];
