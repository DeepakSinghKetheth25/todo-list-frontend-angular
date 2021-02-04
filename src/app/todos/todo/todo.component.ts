import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit , OnChanges{

  @Input() todo:{_id:string, title:string, description:string, status:string};
  @Output() deleteTodo = new EventEmitter<{id:string}>();
  @Output() updatedTodo = new EventEmitter<{id:string,title:string, description:string}>();
  @Output() updateStatus = new EventEmitter<{id:string,status:string}>();

  updatedTitle='';
  updatedDescription='';
  todoId='';
  checkboxChecked = false;
  enableEdit=false;

  constructor(private route : Router) { }
  
  ngOnChanges(changes: SimpleChanges): void {
  console.log("ngOnChanges Called");
  }

  ngOnInit(): void {
    // this.checkboxChecked=false;
    // this.enableEdit=false;
    console.log(this.todo);
    this.checkboxChecked = this.todo.status==='complete'?true:false;
    this.updatedTitle=this.todo.title;
    this.updatedDescription=this.todo.description;
    this.todoId=this.todo._id;
  }

  onUpdateStatus(){
    this.updateStatus.emit({
      id:this.todoId,
      status:'complete'
    });
    this.checkboxChecked=true;    
    
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate(['/todos']); // navigate to same route
    });

  }

  onEdit(){
    // console.log("Edit Clicked : " + this.todoId);
    this.enableEdit = !this.enableEdit;
  }

  onUpdate(obj:{id:string,title:string,description:string}){
    // console.log("When Update Clicked : " + this.todoId + ":" +this.updatedTitle);
    this.updatedTodo.emit({
      id:this.todoId,
      title:this.updatedTitle, 
      description:this.updatedDescription
    });
    this.enableEdit=!this.enableEdit;
    // this.route.navigate(['/todos']);
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate(['/todos']); // navigate to same route
    });

  }

  onDelete( event){
    console.log("Delete Called : " );
    this.deleteTodo.emit({
      id:this.todoId
    });
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate(['/todos']); // navigate to same route
    });

  }

  


}
