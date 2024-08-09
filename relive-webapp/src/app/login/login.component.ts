import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {  
  loginForm = new FormGroup({
    UserName: new FormControl(''),
    Password: new FormControl('')
  })

  constructor (
    private authService: AuthService,
    private router: Router
  ){

  }

  login() {
    console.log("deets", this.loginForm.value)
  }

  loginServe() {
    const val = this.loginForm.value;

    if (val.UserName && val.Password) {
        this.authService.login(val.UserName, val.Password)
            .subscribe(
                () => {
                    console.log("User is logged in");
                    this.router.navigateByUrl('/users-details');
                }
            );
    }
  }
}
