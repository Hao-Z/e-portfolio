import {Component, Injectable, OnInit} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import validate = WebAssembly.validate;
import {Subscription} from "rxjs";
import * as globals from "../../global";
import {userID} from "../../global";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})

@Injectable()
export class SettingsComponent implements OnInit {

  security = ["private"];
  checkbox : any;
  updatePassword: FormGroup;
  update = false;
  constructor(private http: HttpClient, private formBuilder: FormBuilder) { }
  ngOnInit(): void {

    //getSetting();
    this.checkbox = {
      'private' : false
    };

    this.updatePassword = this.formBuilder.group({
      "Current password" : ['',Validators.required],
      "New password" : ['',[Validators.required, Validators.minLength(6)]],
      "Confirm password" : ['',[Validators.required, this.matchPassword('New password')]],
    });
  }

  getSetting(){
    this.http.get(globals.backend_path + "/users/" + userID + "/security",{
      observe: 'response',
    }).subscribe((result:any)=>{
      this.checkbox['private'] = result.body['private'];
    });
  }

  updateSecurity(data) {
    this.http.patch(globals.backend_path + "/users/" + userID + "/security", data, {
      observe: 'response',
    }).subscribe((result) => {
      // This code will be executed when the HTTP call returns successfully
    });
    alert('Changes succeed: ' + JSON.stringify(data));
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
    this.message = {
      'currentPassword':data['Current password'],
      'newPassword':data['New password']
    };
    this.http.post(globals.backend_path + "/users/" + userID + "/update-password", this.message).subscribe((result) => {
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
