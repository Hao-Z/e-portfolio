import {Component, Injectable, OnInit} from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';

@Component({
  templateUrl: './sign-in-up.component.html',
  styleUrls: ['./sign-in-up.component.css']
})

@Injectable()
export class SignInUpComponent implements OnInit {
  signType: String = '';
  signForm: FormGroup;
  title: String = '';

  constructor(private http: HttpClient, private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.signForm = this.formBuilder.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.url.subscribe(data => {
      this.signType = data[data.length - 1].path; // Get the last piece of the URL (login or register)
      this.title = (this.signType === 'login') ? 'Sign in' : 'Sign up';
      if (this.signType === 'register') {
        this.signForm.addControl('email', new FormControl());
      }
    });
  }

    onSubmit(data) {
      this.http.post("http://localhost:8080/signup", data).subscribe((result) => {
        // This code will be executed when the HTTP call returns successfully
      });
      alert('You has submitted' + JSON.stringify(data));
  }
}
