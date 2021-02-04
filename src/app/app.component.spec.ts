import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthService } from './auth/auth.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {

  let component : AppComponent;
  let fixture : ComponentFixture<AppComponent>;
  let navigateSpy: jasmine.Spy;
  

  beforeEach(async () => {
     TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        AppComponent
      ],
      providers:[HttpClient,HttpHandler]
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    navigateSpy = spyOn(TestBed.get(Router), 'navigate'); // <= init spy
    
  });


  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'todo-list'`, () => {
    expect(component.title).toEqual('todo-list');
  });

  it('should have a Navbar', () => {
    expect(fixture.nativeElement.querySelector('#navbar')).toBeTruthy();
  });

  it(`should have brand name as 'TODO'`,()=>{
    let li : HTMLElement;
    li=fixture.nativeElement.querySelector('.navbar-brand li');
    expect(li.textContent).toBe(' TODO ');
  });

  it(`should have nav item as 'Auth'`,()=>{
    let li : HTMLElement;
    li=fixture.nativeElement.querySelector('#auth');
    expect(li).toBeTruthy();
  });

  // it(`should navigate to '/todos' on clicking 'Todos'`,()=>{
  //   const debugElm = fixture.debugElement.nativeElement.querySelector('#auth');
  //   debugElm.click();

  //   expect(navigateSpy).toHaveBeenCalledWith(['auth']); // <= check spy
  // });
  

  it('should have onLogout function',
  ()=>{
   expect(component.onLogout).toBeTruthy();
  });
  

});
