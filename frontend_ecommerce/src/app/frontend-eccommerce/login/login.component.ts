import { ApiService } from 'src/app/shared/api.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { UserRegistration } from 'src/app/user-registration';
import ValidateForm from 'src/app/shared/validedForm';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export default class LoginComponent implements OnInit {
  user: UserRegistration = new UserRegistration();
  loginData!: FormGroup;
  result!: any;
  constructor(
    private toast: NgToastService,
    private http: HttpClient,
    private api: ApiService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginData = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  loginUser() {
    if (this.loginData.valid) {
      console.log(this.loginData.value);
      this.api.loginUserFromRemote(this.loginData.value).subscribe(
        (data) => {
          // alert("Login Success");
          this.loginData.reset();
          this.toast.success({
            detail: 'Successfully Logged In',
            summary: 'Login Success',
            duration: 5000,
          });
          sessionStorage.setItem('id', data.id);
          sessionStorage.setItem('email', data.email);
          this.router.navigate(['/home']);
        },
        (error) => {
          console.log('exception ocurred');
          this.toast.error({
            detail: 'Bad Credentials',
            summary: 'Login Failed,Try again',
            duration: 5000,
          });
        }
      );
    } else {
      console.log('exception ocurred');
      ValidateForm.validedAllFormFileds(this.loginData);
      this.toast.error({
        detail: 'Please enter Email and Password',
        summary: 'Login Failed, Try again',
        duration: 2000,
      });
    }
  }
}
