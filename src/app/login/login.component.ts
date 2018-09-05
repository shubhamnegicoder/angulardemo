import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { IUserLogin } from '../Core/interface';
import { AuthService } from '../Core/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string;

  constructor(private formBulider: FormBuilder,
    private authService: AuthService,
    private router: Router,
   ) {
  }

  ngOnInit() {
    this.buildForm();
  }
  private buildForm() {
    this.loginForm = this.formBulider.group({ username: ['admin', [Validators.required]], password: ['password', [Validators.required]] });
  }

  public newFunction() {
    alert('hello');
  }
  public formHandler({ value, valid }: { value: IUserLogin, valid: boolean }) {
    

    this.authService.logIn(value).subscribe(result => {
      console.log(result);
      // this.spinner.hide();
      if (result === true) {
        this.router.navigate(['/']);
      }
      else
         alert();
        //swal({type:'error',text:'username and password is incorrect'});

      
    });
  }


}
