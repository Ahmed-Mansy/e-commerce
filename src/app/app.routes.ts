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

import { NotfoundComponent } from './features/notfound/notfound.component';
import { authGuard } from './core/guards/auth-guard';
import { isLoggedGuard } from './core/guards/is-logged-guard';
import { AllordersComponent } from './features/allorders/allorders.component';
import { ForgotPaswordComponent } from './core/auth/forgot-pasword/forgot-pasword.component';
import { SubCategoriesComponent } from './features/categories/sub-categories/sub-categories.component';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { DetailsComponent } from './features/details/details.component';
import { WishListComponent } from './features/wish-list/wish-list.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: '', component: AuthLayoutComponent, canActivate: [isLoggedGuard], children: [
            { path: 'login', component: LoginComponent, title: 'Login Page' },
            { path: 'register', component: RegisterComponent, title: 'Register Page' },
            { path: 'forgot', component: ForgotPaswordComponent, title: 'Forgot Password Page' },
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
            { path: 'categories/subCategories/:id/:slug', component: SubCategoriesComponent, title: 'SubCategory Page' },
            { path: 'brands', component: BrandsComponent, title: 'Brands Page' },
            { path: 'allorders', component: AllordersComponent, title: 'All Orders Page' },
            { path: 'allorders', component: AllordersComponent, title: 'All Orders Page' },
            { path: 'wishlist', component: WishListComponent, title: 'Wishlist Page' },
            { path: 'checkout/:id', component: CheckoutComponent, title: 'Checkout Page' },
            { path: 'details/:slug/:id', component: DetailsComponent, title: 'Details Page' },

            // {
            //     path: 'checkout/:id', title: 'Checkout Page',
            //     loadComponent: () => import('./features/checkout/checkout.component').then(m => m.CheckoutComponent),
            //     data: { renderMode: 'server' } // بدل prerender إلى server render
            // },
            // {
            //     path: 'details/:slug/:id', title: 'Details Page',
            //     loadComponent: () => import('./features/details/details.component').then(m => m.DetailsComponent),
            //     data: { renderMode: 'server' }
            // },
            { path: '**', component: NotfoundComponent, title: 'NotFound Page' }
        ]
    },
];
