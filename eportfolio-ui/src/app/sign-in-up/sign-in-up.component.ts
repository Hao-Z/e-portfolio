import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  templateUrl: './sign-in-up.component.html',
  styleUrls: ['./sign-in-up.component.css']
})

export class SignInUpComponent implements OnInit {
  signType: String = '';
  title: String = '';

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.url.subscribe(data => {
      // Get the last piece of the URL (it's either 'login' or 'register')
      this.signType = data[data.length - 1].path;
      // Set a title for the page accordingly
      this.title = (this.signType === 'login') ? 'Sign in' : 'Sign up';
    });
  }
}
