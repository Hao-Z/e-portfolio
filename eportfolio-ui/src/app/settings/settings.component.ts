import {Component, Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import validate = WebAssembly.validate;
import {Subscription} from "rxjs";
import * as globals from "../../global";
import {userID} from "../../global";
import {refreshJwt} from "../../global";
import {jwt} from "../../global";
import {Router} from "@angular/router";
import {NzMessageDataOptions, NzMessageService} from "ng-zorro-antd";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})

@Injectable()
export class SettingsComponent implements OnInit {

  checkbox;
  updatePassword: FormGroup;
  update;
  message : any;
  admin_account: boolean = false;
  constructor(private pop: NzMessageService, private http: HttpClient, private router: Router,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    refreshJwt();
    this.admin_account = globals.username == 'admin';
    this.update = this.admin_account;
    this.getSecurity();
    this.updatePassword = this.formBuilder.group({
      "Current password" : ['',Validators.required],
      "New password" : ['',[Validators.required, Validators.minLength(6)]],
      "Confirm password" : ['',[Validators.required, this.matchPassword('New password')]],
    });
  }

  getSecurity(){
    refreshJwt();
    const HttpOptions = {
      headers : new HttpHeaders({'content-Type': 'application/json',
        'Authorization': jwt})
    };
    this.checkbox = {'isPublic':false};
    this.http.get<any>(globals.backend_path + "users/" + userID + "/security",HttpOptions).subscribe((result:any)=>{
      this.checkbox['isPublic'] = result['isPublic'];
    });
  }

  updateSecurity() {
    refreshJwt();
    const HttpOptions = {
      headers : new HttpHeaders({'content-Type': 'application/json',
        'Authorization': jwt})
    };
    this.http.post<any>(globals.backend_path + "users/" + userID + "/security?_method=patch", this.checkbox, HttpOptions).subscribe((result:any) => {
      // This code will be executed when the HTTP call returns successfully
    });
    // alert('Changes succeed: ' + JSON.stringify(this.checkbox));
    if(this.checkbox['isPublic']){
      this.pop.success('Your CV is VISIBLE from public now!', {nzDuration: 2000});
    } else {
      this.pop.success('Your CV is INVISIBLE from public now!', {nzDuration: 2000});
    }
  }

  matchPassword(comparedName: string): ValidatorFn {
    return (thisPass: AbstractControl): { [key: string]: any } => {
      const comparedPass: AbstractControl = thisPass.root.get(comparedName);
      if (comparedPass) {
        const subscription: Subscription = comparedPass
          .valueChanges.subscribe(() => {
            thisPass.updateValueAndValidity();
            subscription.unsubscribe();
          });
      }
      return (comparedPass && thisPass.value === comparedPass.value) ? null : {notMatch: true};
    };
  }

  updatePW(data) {
    refreshJwt();
    const HttpOptions = {
      headers : new HttpHeaders({'content-Type': 'application/json',
        'Authorization': jwt})
    };
    this.message = {
      'currentPassword':data['Current password'],
      'newPassword':data['New password']
    };
    this.http.post<any>(globals.backend_path + "users/" + userID + "/password?_method=patch", this.message, HttpOptions).subscribe((result) => {
      // do sth when HTTP post returns sucessfully
      // alert('Password changed successfully.');
      this.pop.success('Password changed successfully!', {nzDuration: 2000});
      this.updatePassword = this.formBuilder.group({
        "Current password" : ['',Validators.required],
        "New password" : ['',[Validators.required, Validators.minLength(6)]],
        "Confirm password" : ['',[Validators.required, this.matchPassword('New password')]],
      });
      this.swapUpdate();
    },error => {
      this.updatePassword = this.formBuilder.group({
        "Current password" : ['',Validators.required],
        "New password" : ['',[Validators.required, Validators.minLength(6)]],
        "Confirm password" : ['',[Validators.required, this.matchPassword('New password')]],
      });
      // alert('Password incorrect.');
      this.pop.error('Password incorrect!', {nzDuration: 4000});
    });

  }

  cancel(){
    this.updatePassword = this.formBuilder.group({
      "Current password" : ['',Validators.required],
      "New password" : ['',[Validators.required, Validators.minLength(6)]],
      "Confirm password" : ['',[Validators.required, this.matchPassword('New password')]],
    });
  }

  swapUpdate() {
    if(!this.admin_account){
      this.update = !this.update
    }
  }
}
