import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

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
    private router: Router,
    private appComp: AppComponent,
  ){

  }

  login() {
    console.log("deets", this.loginForm.value)
  }

  loginServe() {
    const val = this.loginForm.value;
    if (val.UserName && val.Password) {
        // console.log("fuck", )
        this.authService.login(val.UserName, val.Password)
        .subscribe((res) => {
              console.log("User is logged in", res);
              localStorage.setItem("access_token", JSON.stringify(res.success_token));
              this.router.navigateByUrl('/users-details');
              this.appComp.LoginStyle='visibility: hidden;'
              this.appComp.LogoutStyle='visibility: visible;'
          }
        );
    //   this.authService.login(loginUrl, data)
    //     .then((serverLoginResponse: any) => {
    //         console.log('Request successful, check login results.');
    //     })
    //     .catch((serverLoginError: any) => {
    //         console.error('error in subscribe err');
    //         // I would first examine the error response
    //         console.log(serverLoginError);
    //     });
    // });
    }
  }

  testAuth(){
    this.authService.testAuth().subscribe((res)=>{
      console.log("test results", res)
    })
  }
}
