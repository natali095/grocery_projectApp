import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from '../admin/admin.component';
import { AdminHomeComponent } from '../admin/admin-home/admin-home.component';
import { AdminLoginPageComponent } from '../admin/admin-login-page/admin-login-page.component';
import { AdminFoodsComponent } from './components/admin-foods/admin-foods.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import {DashboardComponent} from './components/dashboard/dashboard.component' // Import the AuthGuard
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';

const routes: Routes = [
  { path: 'login', component: AdminLoginPageComponent },
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {path: 'header', component: AdminHeaderComponent},
      { path: 'foods/:id', component: AdminFoodsComponent },
      { path: 'users/:id', component: AdminUsersComponent },
      { path: 'home', component: AdminHomeComponent },
      { path: 'dashboard', component: DashboardComponent },
    ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
