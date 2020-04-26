import { Component, OnInit } from '@angular/core';
import {NzFormatEmitEvent, NzTreeNodeOptions} from "ng-zorro-antd";

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
  sortValues: any;
  defalutValue: any;
  nodes: NzTreeNodeOptions[];
  defaultCheckedKeys: any;
  defaultSelectedKeys: any;

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

  nzClick($event: NzFormatEmitEvent) {

  }

  nzCheck($event: NzFormatEmitEvent) {

  }
}
