import { Injectable } from '@angular/core';
import { Food } from '../shared/models/Food';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ADMIN_FOOD_URL, ADMIN_FOOD_DELETE_URL } from '../../user/shared/constants/urls';
import { Observable, tap } from 'rxjs';


const USER_GET_URL = 'http://localhost:5000/api/users';
@Injectable({
  providedIn: 'root'
})


export class AdminFoodService {
  constructor(private http: HttpClient, private toastrService: ToastrService) { }

  getFoods(): Observable<Food[]> {
    return this.http.get<Food[]>(ADMIN_FOOD_URL).pipe(
      tap({
        next: (food) => {
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Foods fetch failed')
        }
      })
    );
  }

  addFood(food: Food): Observable<Food> {
    return this.http.post<Food>(ADMIN_FOOD_URL, food);
  }

  editFood(food: Food): Observable<Food> {
    return this.http.put<Food>(`${ADMIN_FOOD_URL}/update/${food._id}`, food);
  }

  deleteFood(foodId: string): Observable<{}> {
    
   
    return this.http.delete(`http://localhost:5000/api/foods/delete/${foodId}`);
    }
}
