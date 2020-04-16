import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cvs',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {

  userDatas = {
    firstName: 'Chuqiao',
    lastName: 'Chen',
    headline: 'Student of the University of Melbourne',
    education: 'the University of Melbourne',
    industry: 'Information technology',
    region: 'Melbourn, VIC',
    email: 'chuqiao.chen@gmail.com',
    phone: '(61)0400000000',
    profileUrl: 'www.xxxx.xxxxxxxxxxxx.xxx'
  };

  constructor() { }
  isCollapsed = false;
  CVs = ["Name 1","Name 2","Name 3","Name 4","Name 5","Name 6","Name 7","Name 8","Name 9","Name 10"];
  ngOnInit(): void {
  }

}
