import { Component } from '@angular/core';

// @Component({
//   selector: 'app-home',
//   template: `
//     <app-top-bar></app-top-bar>
//     <section class="hero is-info is-bold">
//     <div class="hero-body">
//     <div class="container">

//       <h1 class="title">Home Page!</h1>

//     </div>
//     </div>
//     </section>
//   `,
//   styles: [`
//     .hero {
//       background-image: url('/assets/homepage.jpg') !important;
//       background-size: cover;
//       height:500pt;
//       background-position: center center;
//     }
//   `]
// })
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
      sectionsColor: ['#FF543C', '#098DE9', '#FC6171', '#FEBC04'],
      navigation: false,
      slidesNavigation: true,
      slidesNavPosition: 'bottom',
      scrollOverflow: true,
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
