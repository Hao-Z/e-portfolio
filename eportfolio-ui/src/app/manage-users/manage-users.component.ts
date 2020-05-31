import {Component, destroyPlatform, OnDestroy, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import * as globals from "../../global";
import {from, fromEvent} from "rxjs";
import {NzMessageService} from "ng-zorro-antd";

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit, OnDestroy {

  searchValue = '';
  isCollapsed = window.innerWidth < Number(770);
  userDatas;
  pageNum: number = 0;
  pageSize: number = 10;
  totalPage: number = 1;
  avartarUrl: string = "../../assets/untitled.png";
  edit_user_info: boolean;
  edit_user_id : any = null;

  constructor(private http: HttpClient, private pop: NzMessageService) {
    window.sessionStorage.setItem('admin_id', '1');
  }

  ngOnInit(): void {
    this.edit_user_info = false;
    this.getCVsData(this.pageNum.toString(),this.pageSize.toString(),this.searchValue);
    fromEvent(window,'resize').subscribe((event) => {
      this.isCollapsed = window.innerWidth < Number(770);
    })
  }

  ngOnDestroy(): void {
    this.Back();
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
        } else {
          this.avartarUrl = "../../assets/untitled.png";
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
      this.pop.success("User successfully deleted!");
      this.getCVsData(this.pageNum.toString(),this.pageSize.toString(),this.searchValue);
    },error => {
      this.pop.error("Deletion failed!");
    });
  }

  getUserEditPage(id: any) {
    window.sessionStorage.setItem('uid',id);
    globals.changeUID();
    this.edit_user_info = !this.edit_user_info;
  }

  Back() {
    globals.recoverAdminID();
    this.edit_user_info = !this.edit_user_info;
  }

}
