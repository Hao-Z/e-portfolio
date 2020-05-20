import { Component, OnInit } from '@angular/core';
import {NzFormatEmitEvent, NzTreeNodeOptions} from "ng-zorro-antd";
import {refreshJwt} from "../../global";
import * as globals from "../../global";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-cvs',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {
  width;
  searchValue = '';
  isCollapsed = window.innerWidth < Number(770);
  userDatas;
  pageNum: number = 0;
  pageSize: number = 10;
  totalPage: number = 1;
  CheckedIndustry: any = null;
  CheckedGender: any = null;
  order: string = null;
  Ascending : boolean;

  constructor(private http: HttpClient) { }
  sortValues: any;
  nodes: NzTreeNodeOptions[];
  gender_nodes: NzTreeNodeOptions[] = [
    {title: 'Male', key: 'Male', isLeaf: true, checked: false},
    {title: 'Female', key: 'Female', isLeaf: true, checked: false},
  ];

  ngOnInit(): void {
    this.userDatas = [];
    this.userDatas.push({
      firstName: 'Chuqiao',
      lastName: 'Chen',
      headline: 'Student of the University of Melbourne',
      education: 'the University of Melbourne',
      industry: 'Information Technology',
      region: 'Melbourne, VIC',
      email: 'chuqiao.chen@gmail.com',
      phone: '(+61)0400000000',
      profileUrl: 'www.xxxxxxxx.com'
    }); //Delete
    if(window.innerWidth < Number(770)){
      this.width = "background-color: #F4F3F2;padding-left:0";
    }else{
      this.width = "background-color: #F4F3F2;padding-left:256px";
    }

    var temp_nodes = ['Information Technology','Computer Software','Computer Games','Computer Hardware','Computer Networking'];
    this.nodes = [];
    for(let n of temp_nodes){
      this.nodes.push({title: n, key: n, isLeaf: true, checked: false});
    }

    this.CheckedIndustry = null;
    this.sortValues = ['Age','Experience','Education'];
    this.Ascending = null;
    this.getCVsData(this.pageNum.toString(),this.pageSize.toString(),this.CheckedIndustry,this.CheckedGender,this.order,this.Ascending);
  }

  getOrder(event){
    if(event==null){
      this.order = event;
      this.Ascending = null
    } else {
      this.order = event.toLowerCase();
      this.Ascending = false
    }
    this.getCVsData(this.pageNum.toString(),this.pageSize.toString(),this.CheckedIndustry,this.CheckedGender,this.order,this.Ascending);
  }
  nzEvent(event: NzFormatEmitEvent): void {
    // console.log(event);
  }
  // filterSearch (node: NzTreeNodeOptions): boolean {
    // console.log(node)
    // return false
  // }

  nzGenderEvent($event: NzFormatEmitEvent) {

  }

  nzCheckIndustry(event: NzFormatEmitEvent) {
    if(event.checkedKeys.length == 0){
      this.CheckedIndustry = null;
    }else{
      this.CheckedIndustry = [];
      for(let e of event.checkedKeys){
        this.CheckedIndustry.push(e.key)
      }
    }
    this.getCVsData('0',this.pageSize.toString(),this.CheckedIndustry,this.CheckedGender,this.order,this.Ascending);
  }

  nzCheckGender(event: NzFormatEmitEvent) {
    if(event.checkedKeys.length == 0){
      this.CheckedGender = null;
    }else{
      this.CheckedGender = [];
      for(let e of event.checkedKeys){
        this.CheckedGender.push(e.key)
      }
    }
    this.getCVsData('0',this.pageSize.toString(),this.CheckedIndustry,this.CheckedGender,this.order,this.Ascending);
  }

  clear() {
    this.ngOnInit();
  }

  changePage(event) {
    this.getCVsData((event-1).toString(),this.pageSize.toString(),this.CheckedIndustry,this.CheckedGender,this.order,this.Ascending);
  }

  changeWidth() {
    if(window.innerWidth < Number(770)){
      this.width = "background-color: #F4F3F2;padding-left:0";
    }else{
      this.width = "background-color: #F4F3F2;padding-left:256px";
    }
  }

  getCVsData(pageNum='0', pageSize='10', industry:string[]=null, gender:string=null, orders:string=null, ascending:boolean=null) {
    refreshJwt();
    const HttpOptions = {
      headers : new HttpHeaders({'content-Type': 'application/json',
        'Authorization': localStorage.getItem("jwt_token")}
      )
    };

    //url parameters
    let para = 'pageNum='+pageNum+'&pageSize='+pageSize;
    if(industry!=null){
      for(let i of industry){
        i = i.replace(' ','%20');
        para = para+'&industry%5B%5D='+i;
      }
    }
    if(gender!=null){
      para = para+'&gender='+gender
    }
    if(orders!=null){
      para = para+'&orders='+orders+'&ascending='+ascending.toString()
    }

    this.http.get<any>(globals.backend_path + "explore/filters?" + para, HttpOptions).subscribe((result) => {
      this.userDatas = [];
      for(let cv of result['data']){
        this.userDatas.push(cv);
      }
      this.pageNum = result['PageNum'];
      this.pageSize = result['PageNum'];
      this.totalPage = result['TotalPage'];
    });
  }

  changeAscending() {
    this.Ascending = !this.Ascending;
    this.getCVsData(this.pageNum.toString(),this.pageSize.toString(),this.CheckedIndustry,this.CheckedGender,this.order,this.Ascending);
  }
}
