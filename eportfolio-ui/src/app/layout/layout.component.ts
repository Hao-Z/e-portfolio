import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import * as globals from "../../global";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  isCollapsed = window.innerWidth < Number(770);
  width;
  admin_account = false;
  constructor( private router: Router) {
    //TODO: check if is admin account
    this.admin_account = globals.username == 'admin';
  }

  ngOnInit(): void {
    if(localStorage.getItem('jwt_token') == null){
      this.router.navigate(['/login'])
    }

    if(window.innerWidth < Number(770)){
      this.width = "padding-left:64px; min-height: 100%;";
    }else{
      this.width = " padding-left:256px; min-height: 100%;";
    }
    // var right = document.getElementById("right")
    // var sider = document.getElementById("sider")
    // var w = sider.style["width"]
    // console.log(w.toString())
    // right.style.marginLeft = "200px"
  }

  changeWidth() {
    if(window.innerWidth < Number(770)){
      this.width = "padding-left:64px; min-height: 100%;";
    }else{
      this.width = "padding-left:256px; min-height: 100%;";
    }
  }

}
