import { Component, OnInit } from '@angular/core';

const userDatas = {
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

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css']
})
export class CvComponent implements OnInit {

  public userDatas: {
    firstName: string,
    lastName: String,
    headline: String,
    education: String,
    industry: String,
    region: String,
    email: String,
    phone: String,
    profileUrl: String
  } = userDatas

  constructor() { }

  ngOnInit(): void {
  }

}
