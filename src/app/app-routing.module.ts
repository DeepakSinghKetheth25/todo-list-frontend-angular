import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddTodoComponent } from "./add-todo/add-todo.component";
import { AuthComponent } from "./auth/auth.component";
import { AuthGuard } from "./auth/auth.guard";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { TodoComponent } from "./todos/todo/todo.component";
import { TodosComponent } from "./todos/todos.component";

const appRoutes: Routes=[
    {path:'auth', component: AuthComponent},
    {path: 'todos', component:TodosComponent,canActivate:[AuthGuard]},
    {path: '', redirectTo:'/auth', pathMatch: 'full'},
    // {path: 'completed', component:TodosComponent},
    // {path: 'incomplete', component:TodosComponent},
    {path: 'add',component:AddTodoComponent,canActivate:[AuthGuard]},
    {path: 'not-found',component:PageNotFoundComponent},
    {path: '**', redirectTo:'/not-found'}
];

@NgModule({
    imports:[
        RouterModule.forRoot(appRoutes)
    ],
    exports:[RouterModule]
})
export class AppRoutingModule{
    
}