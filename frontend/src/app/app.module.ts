import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './user/components/particular/header/header.component';
import { HomeComponent } from './user/components/pages/home/home.component';
import { StarRatingComponent } from '.././app/user/components/particular/star-raiting/star-raiting.component';
import { SearchComponent } from './user/components/particular/search/search.component';
import { FoodPageComponent } from './user/components/pages/food-page/food-page.component';
import { TagsComponent } from './user/components/particular/tags/tags.component';
import { CartPageComponent } from './user/components/pages/cart-page/cart-page.component';
import { TitleComponent } from './user/components/particular/title/title.component';
import { NotFoundComponent } from './user/components/particular/not-found/not-found.component';
import { LoginPageComponent } from './user/components/pages/login-page/login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputContainerComponent } from './user/components/particular/input-container/input-container.component';
import { InputValidationComponent } from './user/components/particular/input-validation/input-validation.component';
import { TextInputComponent } from './user/components/particular/text-input/text-input.component';
import { DefaultButtonComponent } from './user/components/particular/default-button/default-button.component';
import { RegisterPageComponent } from './user/components/pages/register-page/register-page.component';
import { LoadingComponent } from './user/components/particular/loading/loading.component';
import { LoadingInterceptor } from './user/shared/interceptors/loading.interceptor';
import { CheckoutPageComponent } from './user/components/pages/checkout-page/checkout-page.component';
import { OrderItemsListComponent } from './user/components/particular/order-items-list/order-items-list.component';
import { MapComponent } from './user/components/particular/map/map.component';
import { AuthInterceptor } from './user/auth/auth.interceptor';
import { PaymentPageComponent } from './user/components/pages/payment-page/payment-page.component';
import { PaypalButtonComponent } from './user/components/particular/paypal-button/paypal-button.component';
import { OrderTrackPageComponent } from './user/components/pages/order-track-page/order-track-page.component';
import { UserService } from './user/services/user.service';
import { AdminModule } from './admin/admin.module';
import { AdminLoginPageComponent } from './admin/admin-login-page/admin-login-page.component'; // Import the AdminModule here
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    StarRatingComponent,
    SearchComponent,
    FoodPageComponent,
    TagsComponent,
    CartPageComponent,
    TitleComponent,
    NotFoundComponent,
    LoginPageComponent,
    InputContainerComponent,
    InputValidationComponent,
    TextInputComponent,
    DefaultButtonComponent,
    RegisterPageComponent,
    LoadingComponent,
    CheckoutPageComponent,
    OrderItemsListComponent,
    MapComponent,
    PaymentPageComponent,
    PaypalButtonComponent,
    OrderTrackPageComponent,

    // Remove AdminModule from declarations, it should not be listed here
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatInputModule, // Add MatInputModule to the imports array
    MatButtonModule, // Add MatButtonModule to the imports array
    MatFormFieldModule,
    // AdminModule, 
    // Include the AdminModule here in the imports array
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      newestOnTop: false
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, // Corrected the AuthInterceptor provider
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
