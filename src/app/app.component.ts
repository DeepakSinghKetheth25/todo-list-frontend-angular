import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'todo-list';

  constructor(private authService:AuthService){}
  
  private userSub : Subscription;
  isAuthenticated=false;

  ngOnInit(): void {

    this.authService.autoLogin();

    this.userSub = this.authService.user.subscribe(user=>{
      this.isAuthenticated = !!user;
      console.log(user);
    });
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }


}
