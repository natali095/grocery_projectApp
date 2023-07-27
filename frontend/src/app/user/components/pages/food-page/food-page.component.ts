import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/user/services/cart.service';
import { FoodService } from 'src/app/user/services/food.service';
import { Food } from 'src/app/user/shared/models/Food';


@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css']
})
export class FoodPageComponent {
food!: Food;
constructor(activatedRoute:ActivatedRoute, foodService:FoodService, 
  private cartService:CartService, private router: Router){
  activatedRoute.params.subscribe((params) => {
    if(params.id)
    foodService.getFoodById(params.id).subscribe(serverFood => {
      this.food = serverFood;
    });
  })
}

addToCart(){
  this.cartService.addToCart(this.food);
  this.router.navigateByUrl('/cart-page');
}


}
