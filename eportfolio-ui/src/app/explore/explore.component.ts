import { Component, OnInit } from '@angular/core';
import {NzFormatEmitEvent, NzTreeNodeOptions} from "ng-zorro-antd";
import {refreshJwt} from "../../global";
import * as globals from "../../global";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { RouterLink } from '@angular/router';
import { UniqueApiService } from 'src/app/core/services/unique-api.service';

@Component({
  selector: 'app-cvs',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {

  sharelink: string

  nodes: NzTreeNodeOptions[];
  nodes_str: string[];

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

  constructor(
    private http: HttpClient,
    private apiService: UniqueApiService
  ) { }
  sortValues: any;
  gender_nodes: NzTreeNodeOptions[] = [
    {title: 'Male', key: '1', isLeaf: true, checked: false},
    {title: 'Female', key: '0', isLeaf: true, checked: false},
  ];

  ngOnInit(): void {
    if(window.innerWidth < Number(770)){
      this.width = "padding-left:0;";
    }else{
      this.width = " padding-left:256px;";
    }
    this.CheckedIndustry = null;
    this.sortValues = ['Age','Experience','Education'];
    this.Ascending = null;

    // <
    // this.getNodes();
    this.nodes_str = ['Computer Games','Computer Hardware','Computer Networking','Computer Software','Information Technology'];
    this.nodes = [];
    for(let n of this.nodes_str){
      this.nodes.push({title: n, key: n, isLeaf: true, checked: false})
    }
    // > Delete

    this.getCVsData(this.pageNum.toString(),this.pageSize.toString(),this.CheckedIndustry,this.CheckedGender,this.order,this.Ascending);
    

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

  nzCheckIndustry($event: NzFormatEmitEvent) {
    if($event.checkedKeys.length == 0){
      this.CheckedIndustry = null;
    }else{
      this.CheckedIndustry = [];
      for(let e of $event.checkedKeys){
        this.CheckedIndustry.push(e.key)
      }
    }
    this.getCVsData('0',this.pageSize.toString(),this.CheckedIndustry,this.CheckedGender,this.order,this.Ascending);
  }

  nzCheckGender($event: NzFormatEmitEvent) {
    if($event.checkedKeys.length == 0){
      this.CheckedGender = null;
    }else{
      this.CheckedGender = [];
      for(let e of $event.checkedKeys){
        this.CheckedGender.push(e.key)
      }
    }
    this.getCVsData('0',this.pageSize.toString(),this.CheckedIndustry,this.CheckedGender,this.order,this.Ascending);
  }

  clear() {
    this.CheckedIndustry = [];
    this.getCVsData('0',this.pageSize.toString(),this.CheckedIndustry,this.CheckedGender,this.order,this.Ascending);
  }

  changePage($event) {
    this.getCVsData(($event-1).toString(),this.pageSize.toString(),this.CheckedIndustry,this.CheckedGender,this.order,this.Ascending);
  }

  changeWidth() {
    if(window.innerWidth < Number(770)){
      this.width = "padding-left:0";
    }else{
      this.width = "padding-left:256px";
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
      if(gender=='0' || gender=='1'){
        para = para + '&gender=' + gender
      }
    }
    if(orders!=null){
      para = para+'&orders='+orders+'&ascending='+ascending.toString()
    }

    this.http.get<any>(globals.backend_path + "explore/filters?" + para, HttpOptions).subscribe((result) => {
      this.userDatas = [];
      for(let cv of result['content']){
        this.userDatas.push(cv);
        console.log(cv)
      }
      this.pageNum = result['number'];
      this.pageSize = result['size'];
      this.totalPage = result['totalPages'];
      // console.log(this.userDatas)
    });
  }

  changeAscending() {
    this.Ascending = !this.Ascending;
    this.getCVsData(this.pageNum.toString(),this.pageSize.toString(),this.CheckedIndustry,this.CheckedGender,this.order,this.Ascending);
  }


  getLink(userID) {
    this.apiService.getSharedLink(userID)
      .subscribe((result: string) => {
        this.sharelink = `${globals.front_path}cv-show?sl=${result}`;
    })
    window.open(this.sharelink)
  }
  // getNodes() {
  //   refreshJwt();
  //   const HttpOptions = {
  //     headers : new HttpHeaders({'content-Type': 'application/json',
  //       'Authorization': localStorage.getItem("jwt_token")}
  //     )
  //   };
  //   this.http.get<any>(globals.backend_path + "explore/industries", HttpOptions).subscribe((result) => {
  //     this.nodes_str = [];
  //     for(let n of result['content']){
  //       this.nodes_str.push(n);
  //     }
  //   });
  // }
}

