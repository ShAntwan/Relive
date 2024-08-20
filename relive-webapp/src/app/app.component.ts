import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'Relive System';
  BackStyle = 'visibility: hidden;'
  LogoutStyle = 'visibility: hidden;'
  LoginStyle = 'visibility: visible;'

  constructor(
    private location: Location,
    private authService: AuthService
  ) {}

  goBack(): void {
    this.location.back();
    this.setBackVisibility(false)
  }

  setBackVisibility(val: boolean) {
    if (val == true) {
      console.log("up")
      this.BackStyle = 'visibility: visible;'
    } else {
      console.log("down")
      this.BackStyle = 'visibility: hidden;'
    }
  }

  logOut(){
    console.log("out")
    this.authService.logout()
    this.LoginStyle = 'visibility: visible;'
    this.LogoutStyle = 'visibility: hidden;'
  }
  
}
