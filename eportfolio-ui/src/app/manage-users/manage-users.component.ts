import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import * as globals from "../../global";
import {fromEvent} from "rxjs";

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
  avartarUrl: string = "assets/untitled.png";

  constructor(private http: HttpClient,) {
  }

  ngOnInit(): void {
    this.searchValue = '';
    this.getCVsData(this.pageNum.toString(),this.pageSize.toString(),this.searchValue);
    fromEvent(window,'resize').subscribe((event) => {
      this.isCollapsed = window.innerWidth < Number(770);
    })
  }

  getLink(userID) {
    var url = "cv-show?link=" + userID;
    // window.open(url,"_self");
    window.location.href = url;
  }

  changePage($event) {
    this.getCVsData(($event-1).toString(),this.pageSize.toString(),this.searchValue);
  }

  search(val) {
    this.searchValue = val;
    this.getCVsData(this.pageNum.toString(),this.pageSize.toString(),this.searchValue);
    // console.log(val)
  }

  getCVsData(pageNum='0', pageSize='10', userName : string = '') {
    const HttpOptions = {
      headers : new HttpHeaders({'content-Type': 'application/json'}
      )
    };

    //url parameters
    let para = 'pageNum='+pageNum+'&pageSize='+pageSize;
    if(userName != ''){
      para = para + '&userName=' + userName;
    }
    // this.http.get<any>(globals.backend_path + "admin/user?" + para, HttpOptions)
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

  deleteUser(id) {
    const HttpOptions = {
      headers : new HttpHeaders({'content-Type': 'application/json'}
      )
    };
    this.http.post<any>(globals.backend_path + "admin/user?_method=delete" , id.toString(), HttpOptions).subscribe((result) => {
    });
    this.getCVsData(this.pageNum.toString(),this.pageSize.toString(),this.searchValue);
  }
}
