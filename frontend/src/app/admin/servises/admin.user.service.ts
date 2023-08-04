import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/User';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ADMIN_USERS_URL, ADMIN_USER_DELETE_URL } from '../../user/shared/constants/urls';

const USER_GET_URL = 'http://localhost:5000/api/users';

@Injectable({
  providedIn: 'root'
})
export class AdminUserService {
  ADMIN_USER_UPDATE_URL = 'http://localhost:5000/api/users/update/';
  ADMIN_USER_DELETE_URL = 'http://localhost:5000/api/admins/delete/';

  [x: string]: any;
  constructor(private http: HttpClient, private toastrService: ToastrService) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(USER_GET_URL).pipe(
      tap({
        next: (users) => {
          // success scenario, you can handle it here
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Users fetch failed')
        }
      })
    );
  }
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.ADMIN_USER_UPDATE_URL}/${user._id}`, user);
  }

  deleteUser(userId: string): Observable<{}> {
    return this.http.delete(`${this.ADMIN_USER_DELETE_URL}/${userId}`);
  }
  addUser(user: any): Observable<any> {
    
   
    return this.http.post(ADMIN_USERS_URL, user);
      }
    }
    

