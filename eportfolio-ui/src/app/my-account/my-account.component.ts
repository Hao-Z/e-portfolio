import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  constructor(private http: HttpClient) { }
  isCollapsed = true;
  ngOnInit(): void {

  }

  profile:any;

  getProfile(){
    this.http.get("http://localhost:8080/getProfile").subscribe((result:any)=>{
      this.profile = result;
    });
  }
}
