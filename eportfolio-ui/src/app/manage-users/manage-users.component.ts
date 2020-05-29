import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import * as globals from "../../global";

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {

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
  avartarUrl: string = "assets/untitled.png"

  constructor(private http: HttpClient,) { }

  ngOnInit(): void {
    this.searchValue = '';
    this.getCVsData(this.pageNum.toString(),this.pageSize.toString(),this.CheckedIndustry,this.CheckedGender,this.order,this.Ascending);
  }

  getLink(id: any) {

  }

  changePage($event) {
    this.getCVsData(($event-1).toString(),this.pageSize.toString(),this.CheckedIndustry,this.CheckedGender,this.order,this.Ascending);
  }

  search(val) {
    console.log(val)
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
      para = para+'&orders='+orders+'&ascending='+ascending.toString()
    }

    this.http.get<any>(globals.backend_path + "explore/filters?" + para, HttpOptions).subscribe((result) => {
      this.userDatas = [];
      for(let cv of result['content']){
        if (cv.profilePhoto) {
          this.avartarUrl = cv.profilePhoto;
        }
        cv['photo'] = this.avartarUrl
        this.userDatas.push(cv);
        // console.log(cv)
      }
      this.pageNum = result['number'];
      this.pageSize = result['size'];
      this.totalPage = result['totalPages'];
      // console.log(this.userDatas)
    });
  }
}
