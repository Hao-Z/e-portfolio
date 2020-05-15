import { Component, OnInit } from '@angular/core';
import {NzFormatEmitEvent, NzTreeNodeOptions} from "ng-zorro-antd";

@Component({
  selector: 'app-cvs',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {
  width;

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
  sortValues: any;
  defalutValue: any;
  nodes: NzTreeNodeOptions[];
  CVs: any;
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
      {title: 'Information Technology', key: 'Information Technology', isLeaf: true, checked: false},
      {title: 'Computer Software', key: 'Computer Software', isLeaf: true, checked: false},
      {title: 'Computer Games', key: 'Computer Games', isLeaf: true, checked: false},
      {title: 'Computer Hardware', key: 'Computer Hardware', isLeaf: true, checked: false},
      {title: 'Computer Networking', key: 'Computer Networking', isLeaf: true, checked: false},
    ];
  ngOnInit(): void {
    if(window.innerWidth < Number(770)){
      this.width = "background-color: #F4F3F2;padding-left:0";
    }else{
      this.width = "background-color: #F4F3F2;padding-left:256px";
    }
    this.nodes = this.test_nodes;
    this.CVs = [
      {'industry': 'Information Technology'},
      {'industry': 'Computer Software'},
      {'industry': 'Computer Games'},
      {'industry': 'Computer Hardware'},
      {'industry': 'Computer Networking'},
    ];
    this.tempCVs = this.CVs;
    this.defalutValue = null;
    this.sortValues = ['order by xxx','order by xxx','order by xxx'];

  }

  getSearch(){
    alert('searched')
  }
  nzEvent(event: NzFormatEmitEvent): void {
    // console.log(event);
  }
  // filterSearch (node: NzTreeNodeOptions): boolean {
    // console.log(node)
    // return false
  // }

  checked: any;
  tempCVs : any;
  nzCheck(event: NzFormatEmitEvent) {
    if(event.checkedKeys.length == 0){
      this.tempCVs=this.CVs;
    }else{
      this.checked = [];
      for(let e of event.checkedKeys){
        this.checked.push(e.key)
      }
      this.tempCVs=[];
      for(let CV of this.CVs){
        console.log(this.tempCVs);
        if(!(this.checked.indexOf(CV.industry)==-1)){
          this.tempCVs.push(CV);
        }
      }
    }
  }

  toCV(profileUrl: string) {
    alert("to CV!")
  }


  clear() {
    this.ngOnInit();
  }

  changePage() {

  }

  changeWidth() {
    if(window.innerWidth < Number(770)){
      this.width = "background-color: #F4F3F2;padding-left:0";
    }else{
      this.width = "background-color: #F4F3F2;padding-left:256px";
    }
  }
}
