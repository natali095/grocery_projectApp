import { Component, OnInit } from '@angular/core';
import { FoodService } from '../../../user/services/food.service';
import { Food } from '../../../user/shared/models/Food';
import { MatInputModule } from '@angular/material/input'; // Import the MatInputModule
import { MatButtonModule } from '@angular/material/button'; // Import the MatButtonModule
import { MatFormFieldModule } from '@angular/material/form-field'; // Import the MatFormFieldModule
import { Tag } from 'src/app/user/shared/models/tag';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-admin-foods',
  templateUrl: './admin-foods.component.html',
  styleUrls: ['./admin-foods.component.css']
})
export class AdminFoodsComponent implements OnInit {
  foods: Food[] = [];
  newFood: Food = new Food();

  constructor(private foodService: FoodService) {}

  ngOnInit() {
    this.getFoods();
  }


  
  getFoods(): void {
    this.foodService.getFoods().subscribe(
      (foods: Food[]) => {
        this.foods = foods;
        console.log('Foods:', foods); // Log the data to the console
      },
      (error: any) => {
        console.error('Error fetching foods:', error);
      }
    );
  }
   

  addFood(): void {
    this.foodService.addFood(this.newFood).subscribe(
      (food: Food) => {
        this.foods.push(food);
        this.newFood = new Food();
      },
      (error: any) => {
        console.error('Error adding food:', error);
      }
    );
  }

  editFood(food: Food): void {
    // Implement the logic to edit the food
  }

  saveFoodChanges(): void {
    // Implement the logic to save changes to the edited food
  }

  cancelEdit(): void {
    // Implement the logic to cancel the editing of a food
  }

  deleteFood(food: Food): void {
    this.foodService.deleteFood(food.id).subscribe(
      () => {
        this.foods = this.foods.filter((f) => f.id !== food.id);
      },
      (error: any) => {
        console.error('Error deleting food:', error);
      }
    );
  }
}
