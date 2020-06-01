import { Component, OnInit } from '@angular/core';
import {NzFormatEmitEvent, NzTreeNodeOptions, NzTreeNode} from "ng-zorro-antd";
import * as globals from "../../global";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { RouterLink } from '@angular/router';
import { UniqueApiService } from 'src/app/core/services/unique-api.service';
import {DataService} from "../core/services/data.service";

@Component({
  selector: 'app-cvs',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {

  nodes: NzTreeNodeOptions[];
  nodes_back : NzTreeNode[];
  nodes_str: any;

  width;
  searchValue = '';
  isCollapsed = window.innerWidth < Number(770);
  userDatas;
  pageNum: number = 0;
  pageSize: number = 5;
  totalPage: number = 1;
  CheckedIndustry: any = null;
  CheckedGender: any = null;
  order: string = null;
  Ascending : boolean;
  avartarUrl: string = "../../assets/untitled.png"
  sortValuesMap : any;

  constructor(
    private http: HttpClient,
    private apiService: UniqueApiService,
    private dataService: DataService
  ) { }
  sortValues: any;
  gender_nodes: NzTreeNodeOptions[] = [
    {title: 'Male', key: '1', isLeaf: true, checked: false},
    {title: 'Female', key: '0', isLeaf: true, checked: false},
  ];

  ngOnInit(): void {
    //TODO: take filter values from windows.SessionStorage.

    if(window.innerWidth < Number(770)){
      this.width = "padding-left:0;";
    }else{
      this.width = " padding-left:256px;";
    }
    this.CheckedIndustry = null;
    this.sortValues = ['Age','Experience','Education'];
    this.sortValuesMap = {'Age':'birthday','Experience':'workingYear','Education':'highestEducation'};
    this.Ascending = null;

    // <
    // this.getNodes();
    this.nodes_str = this.dataService.getIndustryList();
    this.nodes = [];
    this.nodes_back = [];
    // for(let n of this.nodes_str){
    //   this.nodes.push({title: n['label'], key: n['value'], isLeaf: true, checked: false})
    // }

    for(let n of this.nodes_str) {
      this.nodes_back.push(new NzTreeNode({title: n['label'], key: n['value'], isLeaf: true, checked: false}));
    }
    // > Delete

    this.getCVsData(this.pageNum.toString(),this.pageSize.toString(),this.CheckedIndustry,this.CheckedGender,this.order,this.Ascending);

    // console.log(this.userDatas)
  }



  getOrder(event){
    if(event==null){
      this.order = event;
      this.Ascending = null
    } else {
      this.order = this.sortValuesMap[event];
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

  getCVsData(pageNum='0', pageSize='10', industry:string[]=null, gender:string[]=null, orders:string=null, ascending:boolean=null) {
    const HttpOptions = {
      headers : new HttpHeaders({'content-Type': 'application/json'}
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
      for(let g of gender){
        para = para + '&gender%5B%5D=' + g
      }
    }
    if(orders!=null){
      if(orders==this.sortValuesMap['Age']){
        para = para+'&orders='+orders+'&ascending='+(!ascending).toString()
      } else {
        para = para+'&orders='+orders+'&ascending='+ascending.toString()
      }
    }

    this.http.get<any>(globals.backend_path + "explore/filters?" + para, HttpOptions).subscribe((result) => {
      this.userDatas = [];
      for(let cv of result['content']){
        if (cv.profilePhoto) {
          this.avartarUrl = cv.profilePhoto;
        } else {
          this.avartarUrl = "../../assets/untitled.png";
        }
        cv['photo'] = this.avartarUrl
        this.userDatas.push(cv);
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
    var url = "cv-show?link=" + userID;
    // window.open(url,"_self");
    window.location.href = url;
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
  match() {
    for(let i of this.nodes_back){
      if(i.title.toLowerCase().indexOf(this.searchValue.toLowerCase())!=-1){
        i.isMatched = true
      } else {
        i.isMatched = false
      }
    }
  }
}

