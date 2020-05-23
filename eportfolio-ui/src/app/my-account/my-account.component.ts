import {Component, Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import * as globals from "../../global";
import {jwt} from "../../global";
import {username} from "../../global";
import {userID} from "../../global";
import {refreshJwt} from "../../global";
import {NzMessageService} from "ng-zorro-antd";

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})

@Injectable()
export class MyAccountComponent implements OnInit {

  updateForm: FormGroup;
  value_map = {
    'username': 'User Name',
    'email': 'Email',
    'birthday': 'Birthday',
    'phoneNumber': 'Phone Number',
  };

  profiles_value = {
    'username': '',
    'email': '',
    'birthday': '',
    'phoneNumber': '',
  };
  editable = new Map<string,boolean>();
  profiles = ['username', 'email', 'birthday', 'phoneNumber'];

  constructor(private pop: NzMessageService, private http: HttpClient, private router: Router,private route: ActivatedRoute, private formBuilder: FormBuilder) {

    this.updateForm = new FormGroup({
      'username': new FormControl(''),
      'email': new FormControl('', [Validators.email]),
      'birthday': new FormControl(''),
      'phoneNumber': new FormControl('', [Validators.pattern(/^(\+?61|0)4\d{8}$/)]),
    });
  }

  ngOnInit(): void {
    refreshJwt();
    this.getProfile();
    for(let p of this.profiles){
      this.editable.set(p,false);
    }
  }

  getProfile(){
    refreshJwt();
    const HttpOptions = {
      headers : new HttpHeaders({'content-Type': 'application/json',
        'Authorization': localStorage.getItem("jwt_token")})
    };
    this.http.get<any>(globals.backend_path + "users/" + userID + "/profile",HttpOptions).subscribe((result:any)=>{
      if(result['birthday']) {
        this.profiles_value['birthday'] = result['birthday'];
      }
      if(result['phoneNumber']) {
        this.profiles_value['phoneNumber'] = result['phoneNumber'];
      }
    });
    this.http.get<any>(globals.backend_path + "users/" + userID + "/user-information",HttpOptions).subscribe((result:any)=>{
      this.profiles_value['username'] = result['username'];
      if(result['email']) {
        this.profiles_value['email'] = result['email'];
      }
      console.log(this.profiles_value)
    });
  }

  data:any;
  onSubmit(key, value) {
    refreshJwt();
    const HttpOptions = {
      headers : new HttpHeaders({'content-Type': 'application/json',
        'Authorization': localStorage.getItem("jwt_token")}
      )
    };
    if(key == 'email'){
      this.data = {[key]:value};
      this.http.post<any>(globals.backend_path + "users/" + userID + "/user-information?_method=patch", this.data, HttpOptions).subscribe((result) => {
        // This code will be executed when the HTTP call returns successfully
        this.profiles_value[key] = value;
        this.pop.success(this.value_map[key] + ' updated.', {nzDuration: 2000});
      },error => {
        this.pop.error(this.value_map[key] + ' update failed.', {nzDuration: 4000});
      });
    }else{
      if(key == 'birthday' && value[4] == '-'){
        // yyyy-MM-dd to dd-MM-yyyy
        value = value[8]+value[9]+'-'+value[5]+value[6]+'-'+value[0]+value[1]+value[2]+value[3];
      }
      this.data = {[key]:value};
      this.http.post<any>(globals.backend_path + "users/" + userID + "/profile?_method=patch", this.data, HttpOptions).subscribe((result) => {
        // This code will be executed when the HTTP call returns successfully
        this.pop.success(this.value_map[key] + ' updated.', {nzDuration: 2000});
        this.profiles_value[key] = value;
      },error => {
        this.pop.error(this.value_map[key] + ' update failed.', {nzDuration: 4000});
      });
    }
  }

}
