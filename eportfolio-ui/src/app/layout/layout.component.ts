import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  width;

  isCollapsed = window.innerWidth < Number(770);
  constructor( private router: Router) { }

  ngOnInit(): void {
    if(window.innerWidth < Number(770)){
      this.width = "padding-left:100px";
    }else{
      this.width = "padding-left:256px";
    }
    if(localStorage.getItem('jwt_token') == null){
      this.router.navigate(['/login'])
    }
  }

  changeWidth() {
    if(window.innerWidth < Number(770)){
      this.width = "padding-left:100px";
    }else{
      this.width = "padding-left:256px";
    }
  }

}
