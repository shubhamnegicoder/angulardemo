import { Component } from '@angular/core';
import { AuthService } from './Core/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUserLogin } from './Core/interface';
import swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  isLoggedIn=false;
  loginForm: FormGroup;
  errorMessage: string;

  constructor(private formBulider: FormBuilder,
    public authService: AuthService,
    private router: Router
   ) {
  }

  ngOnInit() {
    let isAlreadyLogin = sessionStorage.getItem("isLogged");
    if(isAlreadyLogin === "1"){
    //  alert("already logged in");
      this.authService.subject.next(true);
      this.authService.subject.subscribe(value=>{
        this.authService.isLoggedIn=value;
      })
    }else{
      this.buildForm();
    }
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
        this.authService.subject.subscribe(value=>{
          this.authService.isLoggedIn=value;
        })
      }
      else{
        swal({
          title: '',
          text: 'Invalid Credentials.',
          type: 'warning',
          showCancelButton: false,
          confirmButtonText: 'OK'
        });

      }
        

      
    },err=>{
      swal({
        title: '',
        text: err.error.errorMessage,
        type: 'error',
        showCancelButton: false,
        confirmButtonText: 'OK'
      });
    });
  }
}
