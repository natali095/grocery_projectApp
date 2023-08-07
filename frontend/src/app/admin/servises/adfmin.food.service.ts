import { Injectable } from '@angular/core';
import { Food } from '../shared/models/Food';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Observable, tap } from 'rxjs';
import { ADMIN_FOOD_URL } from '../../user/shared/constants/urls';

const BASE_URL = 'http://localhost:5000/api';
const FOODS_URL = `${BASE_URL}/foods`;

@Injectable({
  providedIn: 'root'
})
export class AdminFoodService {
  updateFood(food: Food): Observable<any> {
    const apiUrl = 'http://localhost:5000/api';
    const url = `${apiUrl}/foods/${food.id}`;
    return this.http.put<Food>(`${ADMIN_FOOD_URL}/update/${food._id}`, food);

  }

  
  constructor(private http: HttpClient, private toastrService: ToastrService) { }

  


  getFoods(): Observable<Food[]> {
    return this.http.get<Food[]>(FOODS_URL).pipe(
      tap({
        next: (food) => {
          // ...any logic after fetching foods
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Foods fetch failed');
        }
      })
    );
  }

  addFood(food: Food): Observable<Food> {
    return this.http.post<Food>(FOODS_URL, food);
  }

  editFood(food: Food): Observable<Food> {
    return this.http.put<Food>(`${FOODS_URL}/update/${food._id}`, food);
  }

  deleteFood(foodId: string): Observable<{}> {
    return this.http.delete(`${FOODS_URL}/delete/${foodId}`);
  }
}

