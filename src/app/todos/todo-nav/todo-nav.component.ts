import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-todo-nav',
  templateUrl: './todo-nav.component.html',
  styleUrls: ['./todo-nav.component.css']
})
export class TodoNavComponent implements OnInit {

  @Output() showCompletedTodo = new EventEmitter();
  @Output() showIncompleteTodo = new EventEmitter();
  @Output() showAllTodos = new EventEmitter();
  

  constructor() { }

  ngOnInit(): void {
  }

  onshowAll(){
    this.showAllTodos.emit();
  }

  onComplete(){
    this.showCompletedTodo.emit();
  }

  onIncomplete(){
    this.showIncompleteTodo.emit();
  }

}
