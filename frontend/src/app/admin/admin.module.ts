import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminLoginPageComponent } from './admin-login-page/admin-login-page.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { AdminFoodsComponent } from './components/admin-foods/admin-foods.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminHeaderComponent,
    AdminHomeComponent,
    AdminLoginPageComponent, // AdminLoginPageComponent is declared here
    AdminUsersComponent,
    AdminFoodsComponent,
    FooterComponent,
    DashboardComponent,
    // Add other admin-related components here
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
  ],
})
export class AdminModule { }
