import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminLoginPageComponent } from './admin-login-page/admin-login-page.component';
import { AdminRoutingModule } from './admin-routing.module';

import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { AdminFoodsComponent } from './components/admin-foods/admin-foods.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import FormsModule and ReactiveFormsModule
import { MatFormFieldModule } from '@angular/material/form-field'; // Import MatFormFieldModule
import { MatInputModule } from '@angular/material/input'; // Import MatInputModule
import { MatButtonModule } from '@angular/material/button'; // Import MatButtonModule
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
    FormsModule,
    RouterModule,
    FormsModule, // Add FormsModule
    ReactiveFormsModule, // Add ReactiveFormsModule
    MatFormFieldModule, // Add MatFormFieldModule
    MatInputModule, // Add MatInputModule
    MatButtonModule, 
    
    // Add MatButtonModule
  ],
})
export class AdminModule { }
