import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TodosComponent } from './todos/todos.component';
import { TodoNavComponent } from './todos/todo-nav/todo-nav.component';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { TodoComponent } from './todos/todo/todo.component';
import { TodoService } from './todos/todos.service';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthComponent } from './auth/auth.component';
import { SharedComponent } from './shared/shared.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    TodoNavComponent,
    AddTodoComponent,
    TodoComponent,
    PageNotFoundComponent,
    AuthComponent,
    SharedComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [TodoService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptorService,
      multi:true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
