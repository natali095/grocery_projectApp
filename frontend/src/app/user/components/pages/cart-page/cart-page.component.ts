import { Component } from '@angular/core';
import { CartService } from 'src/app/user/services/cart.service';
import { Cart, CartItem } from 'src/app/user/shared/models/Cart';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent {
cart!: Cart;
constructor(private cartService: CartService) {
  this.cartService.getCartObservable().subscribe((cart) => {
    this.cart = cart;
  })
}
removeFromCart(cartItem:CartItem){
  this.cartService.removeFromCart(cartItem.food.id);
}

changeQuantity(cartItem:CartItem, quantityInString:string){
  const quantity = parseInt(quantityInString);
  this.cartService.changeQuantity(cartItem.food.id, quantity);
}

}
