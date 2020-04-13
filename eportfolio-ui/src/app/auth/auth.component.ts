import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { Subscription } from "rxjs";
import * as globals from '../../global';

@Component({
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

@Injectable()
export class AuthComponent implements OnInit {
  signType: String = '';
  signForm: FormGroup;
  title: String = '';

  constructor(private http: HttpClient, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.signForm = new FormGroup({
      'username': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6)]),
    });

    this.route.url.subscribe(data => {
      this.signType = data[data.length - 1].path; // get a string that is either 'login' or 'register' from the current URL
      this.title = (this.signType === 'login') ? 'Sign in' : 'Sign up';
      if (this.signType === 'register') {
        this.signForm.addControl('email', new FormControl('',
          [Validators.required, Validators.email]));
        this.signForm.addControl('rePassword', new FormControl('',
          [Validators.required, this.matchPassword( 'password')]
        ));
      }
    });
  }

  matchPassword(comparedName: string): ValidatorFn {
    return (thisPass: AbstractControl): { [key: string]: any } => {
      const comparedPass : AbstractControl = thisPass.root.get(comparedName);
      if (comparedPass) {
        const subscription : Subscription = comparedPass
          .valueChanges.subscribe(() => {
            thisPass.updateValueAndValidity();
            subscription.unsubscribe();
          });
      }
      return (comparedPass && thisPass.value === comparedPass.value) ? null : { notMatch: true };
    };
  }

    onSubmit(data) {
      this.http.post(globals.backend_path + "signup", data).subscribe((result) => {
        // do sth when HTTP post returns sucessfully
      });
      alert('You ve submitted' + JSON.stringify(data));
  }
}
