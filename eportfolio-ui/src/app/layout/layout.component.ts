import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  isCollapsed = window.innerWidth < Number(770);
  constructor( private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('jwt_token') == null){
      this.router.navigate(['/login'])
    }
  }

}
