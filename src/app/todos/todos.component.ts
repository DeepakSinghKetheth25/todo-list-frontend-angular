import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import * as EventEmitter from 'events';
import { TodoService } from './todos.service';
import {Todo} from './todo.model';
import {map} from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})

export class TodosComponent implements OnInit {

  public allTodos:Todo[]=[];
  public todos: Todo[]=[];

  constructor(private todoservice: TodoService,private http:HttpClient,private route:Router) { }

  ngOnInit(): void {
    this.onshowAllTodos();
  }

  onshowAllTodos(){
    this.todoservice.getAllTodos()
    .subscribe(posts=>{
      console.log(posts);
      this.allTodos=posts;
      this.todos=posts;
    });
  }

  onshowCompleted(){
    console.log("showCompleted");
    this.todos = this.allTodos.filter((todo)=>{
      return todo.status==='complete';
    });
  }
  
  onshowIncomplete(){
    console.log("showInCompleted");
    this.todos = this.allTodos.filter((todo)=>{
      return todo.status==='incomplete';
    });
  }

  onUpdateTodo(obj:{id:string,title:string, description:string}){
    this.todoservice.updateTodo(obj)
    .subscribe(responseData=>{
      console.log(responseData);
    });
    //After Updating 
    this.onshowAllTodos();
  }

  onUpdateStatus(obj:{id:string, status:string}){
    this.todoservice.updateStatus(obj)
    .subscribe(responseData=>{
      console.log(responseData);
    });
    //After Updating 
    
    this.onshowAllTodos();
  }

  onDeleteTodo(obj:{id:string}){  
    this.todoservice.deleteTodo(obj)
    .subscribe(responseData=>{
      console.log(responseData);
    });
    this.onshowAllTodos();
  }


}
