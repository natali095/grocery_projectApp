import { Component } from '@angular/core';
import { LoadingService } from 'src/app/user/services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent {

  isLoading!:boolean;

  constructor(loadingService:LoadingService) {
    loadingService.isLoading.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });


  }


}
