import {Component, Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import * as globals from "../../global";
import {jwt} from "../../global";
import {username} from "../../global";
import {userID} from "../../global";
import {refreshJwt} from "../../global";

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})

@Injectable()
export class MyAccountComponent implements OnInit {

  updateForm: FormGroup;
  profiles_value : any;
  editable = new Map<string,boolean>();
  profiles = ['username', 'email', 'birthday', 'phoneNumber'];

  constructor(private http: HttpClient, private route: ActivatedRoute, private formBuilder: FormBuilder) {

    this.updateForm = new FormGroup({
      'username': new FormControl(''),
      'email': new FormControl('', [Validators.email]),
      'birthday': new FormControl(''),
      'phoneNumber': new FormControl('', [Validators.pattern(/^(\+?61|0)4\d{8}$/)]),
    });
  }

  ngOnInit(): void {
    refreshJwt();
    // this.getProfile();
    this.profiles_value = {
      'username': 'Demo',
      'email': 'demo@demo.com',
      'birthday': '30-12-1999',
      'phoneNumber': '0455555555',
    };
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
      this.profiles_value = result.body;
    });
  }

  data:any;
  onSubmit(key, value) {
    refreshJwt();
    if(key == 'email'){
      this.data = {"user":{[key]:value}};
    }else{
      if(key == 'birthday'){
        // yyyy-MM-dd to dd-MM-yyyy
        value = value[8]+value[9]+'-'+value[5]+value[6]+'-'+value[0]+value[1]+value[2]+value[3];
      }
      this.data = {[key]:value};
    }

    const HttpOptions = {
      headers : new HttpHeaders({'content-Type': 'application/json',
        'Authorization': localStorage.getItem("jwt_token")}
      )
    };
    this.http.post<any>(globals.backend_path + "users/" + userID + "/profile?_method=patch", this.data, HttpOptions).subscribe((result) => {
      // This code will be executed when the HTTP call returns successfully
      this.profiles_value[key] = value;
      alert(result.body)
    });
    this.profiles_value[key] = value; //delete
    alert('Changes succeed: ' + JSON.stringify(this.data));
  }

}
