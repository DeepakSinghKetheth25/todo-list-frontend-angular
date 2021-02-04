import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable} from "rxjs";
import { map, tap } from "rxjs/operators";
import { User } from "./user.model";

interface AuthResponseData{
    username:string;
}

interface LoginResponse{
    username:string;
    token:string;
    tokenExpiry:string;

}


@Injectable({providedIn:'root'})
export class AuthService{

    user=new BehaviorSubject<User>(null);
    tokenExpirationTimer : any

    constructor(private http: HttpClient,private route: Router){}
    
    uri='http://localhost:3000/users'

    signup(username:string,password:string):Observable<any>{
        return this.http.post<AuthResponseData>(`${this.uri}/signup`,
        {
            username: username,
            password: password,
        });
    }

    login(username:string, password: string):Observable<any>{
        console.log("Logging In : ")
        return this.http.post<LoginResponse>(`${this.uri}/login`,
        {
            username: username,
            password: password,
        }).
        pipe(
            tap(responseData=>{
              const expirationDate:Date = new Date(new Date().getTime() + (+responseData.tokenExpiry)) 
              const user = new User(responseData.username,responseData.token,responseData.tokenExpiry,expirationDate);
              this.user.next(user);
              this.autoLogout(+responseData.tokenExpiry);
              localStorage.setItem('userData',JSON.stringify(user));
              }
            ));
    }

    autoLogin(){
        const userData:{
            username:string;
            token:string;
            tokenExpiry:string;
            tokenExpirationDate:Date;
        } = JSON.parse(localStorage.getItem('userData'));

        if(!userData)
        return ;

        const loadedUser = new User(userData.username,userData.token,userData.tokenExpiry,userData.tokenExpirationDate);
        
        if(loadedUser.getToken()){
            this.user.next(loadedUser);
            //Updation The Token Expiration Time
            const expirationDurationinMilliSec = new Date(userData.tokenExpirationDate).getTime() - new Date().getTime(); 
            this.autoLogout(expirationDurationinMilliSec);
        }
    }   


    logout(){
        this.user.next(null);
        localStorage.removeItem('userData');
        
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
        this.route.navigate(['/auth']);
    }



    autoLogout(tokenexpiration:number){
        // console.log(tokenexpiration);
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, tokenexpiration);
    }

}