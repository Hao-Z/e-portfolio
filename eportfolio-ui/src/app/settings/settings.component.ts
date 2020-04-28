import {Component, Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import validate = WebAssembly.validate;
import {Subscription} from "rxjs";
import * as globals from "../../global";
import {userID} from "../../global";
import {refreshJwt} from "../../global";
import {jwt} from "../../global";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})

@Injectable()
export class SettingsComponent implements OnInit {

  security = ["privacy"];
  checkbox : any;
  updatePassword: FormGroup;
  update = false;
  constructor(private http: HttpClient, private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    refreshJwt();
    //getSecurity();
    this.checkbox = {
      'privacy' : false
    };

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
    this.http.get<any>(globals.backend_path + "users/" + userID + "/security",HttpOptions).subscribe((result:any)=>{
      this.checkbox['privacy'] = result.body['privacy'];
    });
  }

  updateSecurity() {
    refreshJwt();
    const HttpOptions = {
      headers : new HttpHeaders({'content-Type': 'application/json',
        'Authorization': jwt})
    };
    this.http.patch<any>(globals.backend_path + "users/" + userID + "/security", this.checkbox, HttpOptions).subscribe((result) => {
      // This code will be executed when the HTTP call returns successfully
    });
    alert('Changes succeed: ' + JSON.stringify(this.checkbox));
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

  message : any;
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
    this.http.patch<any>(globals.backend_path + "users/" + userID + "/update-password", this.message, HttpOptions).subscribe((result) => {
      // do sth when HTTP post returns sucessfully
      this.updatePassword = this.formBuilder.group({
        "Current password" : ['',Validators.required],
        "New password" : ['',[Validators.required, Validators.minLength(6)]],
        "Confirm password" : ['',[Validators.required, this.matchPassword('New password')]],
      });
      this.update = !this.update
    });
    this.updatePassword = this.formBuilder.group({
      "Current password" : ['',Validators.required],
      "New password" : ['',[Validators.required, Validators.minLength(6)]],
      "Confirm password" : ['',[Validators.required, this.matchPassword('New password')]],
    });
    this.update = !this.update; //delete
    alert('You ve submitted' + JSON.stringify(this.message));
  }

  cancel(){
    this.updatePassword = this.formBuilder.group({
      "Current password" : ['',Validators.required],
      "New password" : ['',[Validators.required, Validators.minLength(6)]],
      "Confirm password" : ['',[Validators.required, this.matchPassword('New password')]],
    });
  }
}
