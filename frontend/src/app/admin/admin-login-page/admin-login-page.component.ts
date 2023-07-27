import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../servises/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AppComponent } from 'src/app/app.component';






@Component({
  selector: 'app-admin-login-page',
  templateUrl: './admin-login-page.component.html',
  styleUrls: ['./admin-login-page.component.css']
})
export class AdminLoginPageComponent implements OnInit {
  loginForm!: FormGroup;
  isSubmitted = false;
  returnUrl = '';

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || '/admin';
  }

  get fc() {
    return this.loginForm.controls;
  }

  submit() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) return;
  
    this.adminService.login({ email: this.fc.email.value, password: this.fc.password.value }).subscribe(
      () => {
        // Determine the role of the user after successful login
        // If it's an admin, navigate to the admin dashboard
        if (this.adminService.isAdmin()) {
          this.router.navigateByUrl('/admin/dashboard');
        } else {
          // If it's a regular user, navigate to the main HomeComponent
          this.router.navigateByUrl('/home'); // Replace '/home' with the path to your main HomeComponent
        }
      },
      (error) => {
        console.error('Login failed:', error);
        // You can show an error message or take any other action to notify the user
      }
    );
  }
}
