import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/user/services/order.service';
import { Order } from 'src/app/user/shared/models/Orders';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent implements OnInit{

order:Order = new Order();

constructor(orderService:OrderService, router: Router) {
  orderService.getNewOrderForCurrentUser().subscribe({
    next: (order) => {
      this.order = order;
    },
    error:() => {
      router.navigateByUrl('/checkout');

    }
  })
}





  ngOnInit(): void {
    
  }



}
