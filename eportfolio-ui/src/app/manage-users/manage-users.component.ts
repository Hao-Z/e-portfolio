import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import * as globals from "../../global";
import {fromEvent, timer} from "rxjs";
import {timeout} from "rxjs/operators";

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
  avartarUrl: string = "../../assets/untitled.png";

  constructor(private http: HttpClient,) {
  }

  ngOnInit(): void {
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

  getCVsData(pageNum='0', pageSize='10', username : string = '') {
    const HttpOptions = {
      headers : new HttpHeaders({'content-Type': 'application/json',
        'Authorization': localStorage.getItem("jwt_token")}
      )
    };

    //url parameters
    let para = 'pageNum='+pageNum+'&pageSize='+pageSize;
    if(username != ''){
      para = para + '&username=' + username;
    }
    this.http.get<any>(globals.backend_path + "admin/user?" + para, HttpOptions).subscribe((result) => {
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
      headers : new HttpHeaders({'content-Type': 'application/json',
        'Authorization': localStorage.getItem("jwt_token")}
      )
    };
    this.http.post<any>(globals.backend_path + "admin/user?id="+id+"&_method=delete" , id.toString(), HttpOptions).subscribe((result) => {
      this.getCVsData(this.pageNum.toString(),this.pageSize.toString(),this.searchValue);
    });
  }
}
