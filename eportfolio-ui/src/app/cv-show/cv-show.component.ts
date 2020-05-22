import { Component, OnInit } from '@angular/core';
import {NzFormatEmitEvent, NzTreeNodeOptions} from "ng-zorro-antd";
@Component({
  selector: 'app-cv-show',
  templateUrl: './cv-show.component.html',
  styleUrls: ['./cv-show.component.css']
})
export class CvShowComponent implements OnInit {
  config;
  isCollapsed = window.innerWidth < Number(770);
  lineitem = '2020';
  userDatas = {
    firstName: 'Chuqiao',
    lastName: 'Chen',
    headline: 'Student of the University of Melbourne',
    education: 'the University of Melbourne',
    industry: 'Information Technology',
    region: 'Melbourne, VIC',
    email: 'chuqiao.chen@gmail.com',
    phone: '(+61)0400000000',
    profileUrl: 'www.xxxxxxxx.com'
  };
  experiences = [
    {
      time: '2019.05 - 2020.03',
      detail: 'University of Melbourne'
    },
    {
      time: '2019.05 - 2020.03',
      detail: 'University of Melbourne'
    }
  ]
  cvData = [
    {'block': 'Education'},
    {'block': 'Work Experience'},
    {'block': 'Skills'}
  ];
  tempCVs = [
    {'industry': 'Information Technology'},
    {'industry': 'Computer Software'},
    {'industry': 'Computer Games'},
    {'industry': 'Computer Hardware'},
    {'industry': 'Computer Networking'},
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
