import { Component, OnInit } from '@angular/core';
import * as globals from '../../global';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})

export class TopBarComponent implements OnInit {
  username: String = ''
  isLoggedIn: boolean = false

  ngOnInit() {
    if(globals.username != null){
      this.username = globals.username
      this.isLoggedIn = true;
    }
  }

}
