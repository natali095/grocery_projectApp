
import { Injectable } from '@angular/core';
import { Admin } from '../shared/models/Admin';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IAdminLogin } from '../shared/interfaces/iAdminLogin';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ADMIN_LOGIN_URL } from 'src/app/user/shared/constants/urls';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router'; // Import Router service

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private adminSubject = new BehaviorSubject<Admin>(new Admin());
  public adminObservable: Observable<Admin>;

  constructor(
    private http: HttpClient,
    private toastrService: ToastrService,
    private router: Router // Inject Router service
  ) {
    this.adminObservable = this.adminSubject.asObservable();
  }

  login(adminLogin: IAdminLogin): Observable<Admin> {
    return this.http.post<Admin>(ADMIN_LOGIN_URL, adminLogin).pipe(
      tap({
        next: (admin) => {
          this.adminSubject.next(admin);
          this.toastrService.success(
            `Welcome to Admin Portal ${admin.name!}`,
            'Login Successful'
          );
          this.router.navigateByUrl('/admin');
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Login Failed');
        }
      })
    );
  }
  isAdmin(): boolean {
    // Check if the user is authenticated
    const isAuthenticated = !!this.adminSubject.getValue().name;
  
    // Check if the user is an admin (Assuming 'isAdmin' is a property of the 'Admin' model)
    const isAdmin = this.adminSubject.getValue().isAdmin === true;
  
    // Return true only if the user is authenticated and is an admin
    return isAuthenticated && isAdmin;
  }
}