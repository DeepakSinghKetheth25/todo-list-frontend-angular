import { stringify } from '@angular/compiler/src/util';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TodoService } from '../todos/todos.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {

  @Output() newTodo =  new EventEmitter<{title:string, description:string, status:string}>();
 

  constructor(private todoservice:TodoService,public route:Router,private fb : FormBuilder) { }

  addTodoForm : FormGroup;
  
  
  ngOnInit(): void {
    this.addTodoForm=this.fb.group({
      'title' : new FormControl('',Validators.required) ,
      'description': new FormControl('',Validators.required),
      'status' : new FormControl('incomplete')
    });

  }


  onAddTodo(){  
    this.todoservice.addTodo(
      {
        title:this.addTodoForm.get('title').value,
        description:this.addTodoForm.get('description').value,
        status:this.addTodoForm.get('status').value
      }).subscribe(responseData=>{
        console.log(responseData);
    });

    this.route.navigate(['/todos']);

  }

}
