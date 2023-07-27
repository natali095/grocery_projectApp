import { Component } from '@angular/core';
import { StarRatingComponent } from '../../particular/star-raiting/star-raiting.component';
import { CartService } from 'src/app/user/services/cart.service';
import { UserService } from 'src/app/user/services/user.service';
import { User } from 'src/app/user/shared/models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  cartQuantity=0;
  user!:User;
  constructor(cartService:CartService, private userService:UserService) {
    cartService.getCartObservable().subscribe((newCart) => {
      this.cartQuantity = newCart.totalCount;
    })
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;

    })
  }

  logout(){
    this.userService.logout();
  }

  get isAuth(){
    return this.user.token;
  }
}
