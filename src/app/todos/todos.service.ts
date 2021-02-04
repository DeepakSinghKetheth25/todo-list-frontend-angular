import {map} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class TodoService{

    constructor(private http:HttpClient){}
    
    uri = 'http://localhost:3000';

   getAllTodos(): Observable<any>{
    return this.http.get(`${this.uri}/todos`)
    .pipe(
      map(responseData => {
        const todoArray=[];
        for(const key in responseData){
          if(responseData.hasOwnProperty(key)){
            todoArray.push({...responseData[key]});
          }
        }
        return todoArray;  
      }));
   }
   
   addTodo(obj: { title: string; description: string; status: string; }):Observable<any> {
    return this.http.post(`${this.uri}/todos`,obj);
   }
   
   updateTodo(obj:{id:string,title:string, description:string}): Observable<any>{
    return this.http.put(`${this.uri}/todos/${obj.id}`,obj);
   }

   updateStatus(obj:{id:string,status:string}): Observable<any>{
       console.log("Updating");
    return this.http.put(`${this.uri}/todos/${obj.id}`,obj);
   }
   
   deleteTodo(obj: { id: string; }): Observable<any> {
       return this.http.delete(`${this.uri}/todos/${obj.id}`);
  }


}