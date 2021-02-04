import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  isLoading=false;
  error: string = '';
  
  constructor(private authService:AuthService, private route : Router) { }

  ngOnInit(): void {
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm){
    if(!form.valid)
      return;

    this.isLoading=true;
    if(this.isLoginMode){
      console.log("Login");
      this.authService.login(form.value.username,form.value.password)
      .subscribe(responseData=>{
        console.log(responseData);
        console.log("Returned Now Navigating:");
        this.isLoading=false;
        this.route.navigate(['/todos']);
      },
      error=>{
        this.isLoading=false;
        this.error='Login error Occurred !';
      });
    }
    else{
      console.log(form.value.username);
      this.authService.signup(form.value.username,form.value.password)
      .subscribe(responseData=>{
        console.log(responseData);
        this.isLoading=false;
      },
      error=>{
        console.log(error);
        this.isLoading=false;
        this.error='Signup error Occurred !';
        setTimeout(() => {
          this.error='';
        }, 2000);
        this.isLoading=false;
      });
  
      form.reset();
    }
  }
}
