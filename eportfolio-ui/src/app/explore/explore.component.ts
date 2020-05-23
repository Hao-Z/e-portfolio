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

  nodes: NzTreeNodeOptions[];
  displayed_nodes: NzTreeNodeOptions[];
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
  gender_nodes: NzTreeNodeOptions[] = [
    {title: 'Male', key: '0', isLeaf: true, checked: false},
    {title: 'Female', key: '1', isLeaf: true, checked: false},
  ];

  ngOnInit(): void {
    if(window.innerWidth < Number(770)){
      this.width = "background-color: #F4F3F2;padding-left:0;";
    }else{
      this.width = "background-color: #F4F3F2; padding-left:256px;";
    }
    this.CheckedIndustry = null;
    this.sortValues = ['Age','Experience','Education'];
    this.Ascending = null;

    this.getCVsData(this.pageNum.toString(),this.pageSize.toString(),this.CheckedIndustry,this.CheckedGender,this.order,this.Ascending);
    this.displayed_nodes = this.nodes;
  }

  getOrder(event){
    if(event==null){
      this.order = event;
      this.Ascending = null
    } else if(event=='Age'){
      this.order = 'birthday';
      this.Ascending = false
    } else {
      this.order = event.toLowerCase();
      this.Ascending = false
    }
    this.getCVsData(this.pageNum.toString(),this.pageSize.toString(),this.CheckedIndustry,this.CheckedGender,this.order,this.Ascending);
  }

  nzEvent(event: NzFormatEmitEvent): void {
    if(event.keys.length==0){
      this.displayed_nodes = this.nodes;
    } else {
      this.displayed_nodes = [];
      for(let n of event.keys){
        this.displayed_nodes.push({title: n, key: n, isLeaf: true, checked: false});
      }
    }
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
    this.CheckedIndustry = null;
    this.getCVsData(this.pageNum.toString(),this.pageSize.toString(),this.CheckedIndustry,this.CheckedGender,this.order,this.Ascending);
    var temp = this.displayed_nodes;
    this.displayed_nodes = [];
    for(let dn of temp){
      dn.checked=false;
      this.displayed_nodes.push(dn);
    }
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

  getCVsData(pageNum='0', pageSize='10', industry:string[]=null, gender:string[]=null, orders:string=null, ascending:boolean=null) {
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
      for(let i of gender) {
        para = para + '&gender%5B%5D=' + i
      }
    }
    if(orders!=null){
      para = para+'&orders='+orders+'&ascending='+ascending.toString()
    }
    this.userDatas = [];
    this.nodes = [];
    this.http.get<any>(globals.backend_path + "explore/filters?" + para, HttpOptions).subscribe((result) => {

      for(let cv of result['content']){
        this.userDatas.push(cv);
        if(this.nodes.indexOf(cv['industry'])==-1){
          this.nodes.push({title: cv['industry'], key: cv['industry'], isLeaf: true, checked: false});
        }
      }
      this.pageNum = result['number'];
      this.pageSize = result['size'];
      this.totalPage = result['totalPages'];
    });
  }

  changeAscending() {
    this.Ascending = !this.Ascending;
    this.getCVsData(this.pageNum.toString(),this.pageSize.toString(),this.CheckedIndustry,this.CheckedGender,this.order,this.Ascending);
  }
}
