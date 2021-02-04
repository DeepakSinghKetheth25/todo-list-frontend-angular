import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTodoComponent } from './add-todo.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TodoService } from '../todos/todos.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';

describe('AddTodoComponent', () => {
  let component: AddTodoComponent;
  let fixture: ComponentFixture<AddTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTodoComponent ],
      imports : [RouterTestingModule],
      providers: [HttpClient,TodoService,FormBuilder,
        HttpHandler] 
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should have addTodo Function', () => {
    expect(component.onAddTodo).toBeTruthy();
  });

  it('should navigate to todos on clicking add button', () => {
    spyOn(component.route, 'navigate');
    component.onAddTodo();
    expect(component.route.navigate).toHaveBeenCalledWith(['/todos']);
  
  });



});



