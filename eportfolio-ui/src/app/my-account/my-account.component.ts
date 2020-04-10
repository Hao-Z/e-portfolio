import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  constructor(private http: HttpClient) { }
  isCollapsed = true;

  profile:any;
  ngOnInit(): void {
    this.getProfile()
  }

  getProfile(){
    this.http.get("http://localhost:8080/getprofile").subscribe((result:any)=>{
      this.profile = result;
    });
  }

}
