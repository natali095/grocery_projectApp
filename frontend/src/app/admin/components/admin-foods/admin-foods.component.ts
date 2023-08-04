import { Component, OnInit } from '@angular/core';
import { AdminFoodService } from '../../servises/adfmin.food.service';
import { Food } from '../../../user/shared/models/Food'; // Replace 'path-to-food-model' with the actual path to your food model
import { MatInputModule } from '@angular/material/input'; // Import the MatInputModule
import { MatButtonModule } from '@angular/material/button'; // Import the MatButtonModule
import { MatFormFieldModule } from '@angular/material/form-field'; // Import the MatFormFieldModule
@Component({
  selector: 'app-admin-foods',
  templateUrl: './admin-foods.component.html',
  styleUrls: ['./admin-foods.component.css']
})
export class AdminFoodsComponent implements OnInit {
  foods: Food[] = [];
  newFood: Food = new Food();

  constructor(private foodService: AdminFoodService) {}

  ngOnInit() {
    this.getFoods();
  }


  
  getFoods(): void {
    this.foodService.getFoods().subscribe(
      (foods: Food[]) => {
        this.foods = foods;
        console.log('foods:', foods); // Log the data to the console
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
    this.foodService.deleteFood(food._id).subscribe(
      () => {
        this.foods = this.foods.filter((f) => f._id !== food._id);
      },
      (error: any) => {
        console.error('Error deleting food:', error);
      }
    );

  // deleteFood(food: { _id: any; }) {
  //   this.foodService.deleteFood(food._id).subscribe(
  //     () => {
  //       this.foods = this.foods.filter((u) => u._id !== food._id);
  //     },
  //     (error: any) => {
  //       console.error('Error deleting user:', error);
  //     }
  //   );
  }
  }

  

