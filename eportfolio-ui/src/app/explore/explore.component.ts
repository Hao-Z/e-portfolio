import { Component, OnInit } from '@angular/core';
import {NzFormatEmitEvent, NzTreeNodeOptions} from "ng-zorro-antd";

@Component({
  selector: 'app-cvs',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {
  isCollapsed = window.innerWidth < Number(770);
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
  CVs = [
    {'industry': 'Information technology'},
    {'industry': 'Computer Software'},
    {'industry': 'Computer Games'},
    {'industry': 'Computer Hardware'},
    {'industry': 'Computer Networking'},
  ];
  sortValues: any;
  defalutValue: any;
  nodes: NzTreeNodeOptions[];
  defaultCheckedKeys: any;
 /** industryColor: any = {
    "Information technology":"background-color : #6a8dc3",
    "Computer Software":"background-color : #7c858a",
    "Computer Games":"background-color : #0f4c81",
    "Computer Hardware":"background-color : #f4b894",
    "Computer Networking":"background-color : #a38d80",
  };**/

industryColor: any = {
  "Information technology":"background-color : rgba(106, 141, 195, 0.7)",
  "Computer Software":"background-color : rgba(124, 133, 138, 0.7)",
  "Computer Games":"background-color : rgba(15, 76, 129, 0.7)",
  "Computer Hardware":"background-color : rgba(244, 184, 148, 0.7)",
  "Computer Networking":"background-color : rgba(163, 141, 128, 0.7)",
};
  ngOnInit(): void {
    this.nodes = [
      {title: 'demo1', key: 'demo1', isLeaf: true},
      {title: 'demo2', key: 'demo2', isLeaf: true},
      {title: 'demo3', key: 'demo3', isLeaf: true},
      {title: 'demo4', key: 'demo4', isLeaf: true},
    ];
    this.defalutValue = null;
    this.sortValues = ['demo1','demo2','demo3'];
  }

  getSearch(){
    alert('searched')
  }

  nzCheck($event: NzFormatEmitEvent) {

  }

  toCV(profileUrl: string) {
    alert("to CV!")
  }
}
