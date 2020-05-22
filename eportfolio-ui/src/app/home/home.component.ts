import { Component } from '@angular/core';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  config;
  fullpage_api;

  constructor() {
    // this is just an example => for more details on config please visit fullPage.js docs
    this.config = {
      licenseKey: null,
      sectionsColor: ['#EFC142', '#098DE9', '#FC6171', '#FEBC04'],
      navigation: false,
      slidesNavigation: true,
      slidesNavPosition: 'bottom',
      scrollOverflow: false,
      paddingTop: '3em',
      cards: true,
      controlArrows: true,
   
    };
  }

  ngOnInit() {
  }

  getRef(fullPageRef) {
    this.fullpage_api = fullPageRef;
  }

}
