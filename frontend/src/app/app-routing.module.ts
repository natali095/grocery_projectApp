import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivateChild, Router } from '@angular/router';
import { HomeComponent } from './user/components/pages/home/home.component';
import { FoodPageComponent } from './user/components/pages/food-page/food-page.component';
import { CartPageComponent } from './user/components/pages/cart-page/cart-page.component';
import { LoginPageComponent } from './user/components/pages/login-page/login-page.component';
import { RegisterPageComponent } from './user/components/pages/register-page/register-page.component';
import { CheckoutPageComponent } from './user/components/pages/checkout-page/checkout-page.component';
import { AuthGuard } from './user/auth/guards/auth.guard';
import { PaymentPageComponent } from './user/components/pages/payment-page/payment-page.component';
import { OrderTrackPageComponent } from './user/components/pages/order-track-page/order-track-page.component';
import { NotFoundComponent } from './user/components/particular/not-found/not-found.component';
import { AdminLoginPageComponent } from './admin/admin-login-page/admin-login-page.component';

const routes: Routes = [
  // User routes
  { path: '', component: HomeComponent },
  { path: 'search/:searchTerm', component: HomeComponent },
  { path: 'tag/:tag', component: HomeComponent },
  { path: 'food/:id', component: FoodPageComponent },
  { path: 'cart-page', component: CartPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'checkout', component: CheckoutPageComponent, canActivate: [AuthGuard] },
  { path: 'payment', component: PaymentPageComponent, canActivate: [AuthGuard] },
  { path: 'track/:orderId', component: OrderTrackPageComponent, canActivate: [AuthGuard] },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule) },
  { path: '**', component: NotFoundComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
