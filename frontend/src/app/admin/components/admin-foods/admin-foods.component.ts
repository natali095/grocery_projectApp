import { Component, OnInit } from '@angular/core';
import { AdminFoodService } from '../../servises/adfmin.food.service';
import { Food } from '../../shared/models/Food'; // Replace 'path-to-food-model' with the actual path to your food model
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
  newFood: Food = {
    id: 'temp-id',
    name: '',
    price: 0,
    tags: [], // use an empty array
    favorite: false, // use a boolean
    stars: 0, // use a number
    imageUrl: '', 
    origins: [], // use an empty array
    cookTime: '',
  };
  editingFood: Food | null = null;

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
  editFood(food: Food) {
    if (food) {
      this.editingFood = { ...food } as Food;
    } else {
      this.editingFood = null;
    }
  }
  saveFoodChanges() { // Rename this method
    if (this.editingFood) {
        this.foodService.updateFood(this.editingFood).subscribe(
            () => {
                const index = this.foods.findIndex((food) => food._id === this.editingFood?._id);
                if (index !== -1) {
                    if (this.editingFood && this.editingFood.id) {
                        this.foods[index] = { ...this.editingFood };
                    }
                    this.editingFood = null;
                }
            },
            (error: any) => {
                console.error('Error updating food:', error);
            }
        );
    }
}
  



  cancelEdit(): void {
    // Implement the logic to cancel the editing of a food
  }


  deleteFood(food: Food): void {
    this.foodService.deleteFood(food._id).subscribe( // Assuming you have a deleteFood method in your service
        () => {
            const index = this.foods.findIndex(f => f._id === food._id);
            if (index !== -1) {
                this.foods.splice(index, 1);
            }
        },
        (error: any) => {
            console.error('Error deleting food:', error);
        }
    );
} 
}

  

