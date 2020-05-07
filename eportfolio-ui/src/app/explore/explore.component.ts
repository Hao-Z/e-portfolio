import { Component, OnInit } from '@angular/core';
import {NzFormatEmitEvent, NzTreeNodeOptions} from "ng-zorro-antd";

@Component({
  selector: 'app-cvs',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {
  searchValue = '';
  isCollapsed = window.innerWidth < Number(770);
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

  constructor() { }
  CVs = [
    {'industry': 'Information Technology'},
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
  "Information Technology":"background-color : rgba(106, 141, 195, 0.7)",
  "Computer Software":"background-color : rgba(124, 133, 138, 0.7)",
  "Computer Games":"background-color : rgba(15, 76, 129, 0.7)",
  "Computer Hardware":"background-color : rgba(244, 184, 148, 0.7)",
  "Computer Networking":"background-color : rgba(163, 141, 128, 0.7)",
};
test_nodes = [
    {title: 'Information Technology', key: 'demo1', isLeaf: true},
    {title: 'Computer Software', key: 'demo2', isLeaf: true},
    {title: 'Computer Games', key: 'demo3', isLeaf: true},
    {title: 'Computer Hardware', key: 'demo4', isLeaf: true},
    {title: 'Computer Networking', key: 'demo5', isLeaf: true},
]
  ngOnInit(): void {
    this.nodes = this.test_nodes;
    this.defalutValue = null;
    this.sortValues = ['order by xxx','order by xxx','order by xxx'];
    
  }

  getSearch(){
    alert('searched')
  }
  nzEvent(event: NzFormatEmitEvent): void {
    // console.log(event);
  }
  filterSearch (node: NzTreeNodeOptions): boolean {
    console.log(node)
    return false
  }
  nzCheck($event: NzFormatEmitEvent) {

  }
}
