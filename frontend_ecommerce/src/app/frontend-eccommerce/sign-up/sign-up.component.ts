import { Component, OnInit } from '@angular/core';
import { UserRegistration } from 'src/app/user-registration';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiService } from 'src/app/shared/api.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  UserRegistrationObj: UserRegistration = new UserRegistration();
  public userData!: FormGroup;
  private unsubscriber: Subject<void> = new Subject<void>();
  constructor(
    private toast: NgToastService,
    private api: ApiService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.userData = this.formBuilder.group({
      email: ['', Validators.required],
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      password: ['', Validators.required],
    });
    history.pushState(null, '');

    fromEvent(window, 'popstate')
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((_) => {
        history.pushState(null, '');
      });
  }
  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  onSubmit() {
    this.UserRegistrationObj.email = this.userData.value.email;
    this.UserRegistrationObj.fname = this.userData.value.fname;
    this.UserRegistrationObj.lname = this.userData.value.lname;
    this.UserRegistrationObj.password = this.userData.value.password;
    console.log(this.UserRegistrationObj);
    this.api.registerUserFromRemote(this.UserRegistrationObj).subscribe(
      (data) => {
        console.log(data);
        this.toast.success({
          detail: 'Sucess',
          summary: 'You have registered successfully',
          duration: 5000,
        });
        let ref = document.getElementById('cancel');
        ref?.click();
        this.userData.reset();
        this.router.navigate(['/login']);
      },
      (err) => {
        this.toast.error({
          detail: 'Error Occoured',
          summary: 'Something went wrong',
          duration: 5000,
        });
      }
    );
  }
}
