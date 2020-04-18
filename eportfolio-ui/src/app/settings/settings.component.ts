import {Component, Injectable, OnInit} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import validate = WebAssembly.validate;
import {Subscription} from "rxjs";
import * as globals from "../../global";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})

@Injectable()
export class SettingsComponent implements OnInit {

  settings = ["Make the CV private",];
  checkbox = new Map<string,boolean>();
  updatePassword: FormGroup;
  update = false;
  constructor(private http: HttpClient, private formBuilder: FormBuilder) { }
  ngOnInit(): void {

    //getSetting();
    for(let s of this.settings){
      this.checkbox.set(s,false);
    }
    this.updatePassword = this.formBuilder.group({
      "Current password" : ['',Validators.required],
      "New password" : ['',[Validators.required, Validators.minLength(6)]],
      "Confirm password" : ['',[Validators.required, this.matchPassword('New password')]],
    });
  }

  getSetting(){
    this.http.get(globals.backend_path + "getsetting").subscribe((result:any)=>{
      this.checkbox = result;
    });
  }

  updateSetting(data) {
    this.http.put(globals.backend_path + "updatesetting", data).subscribe((result) => {
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

  onSubmit(data) {
    this.http.post(globals.backend_path + "signup", data).subscribe((result) => {
      // do sth when HTTP post returns sucessfully
      this.update = !this.update;
    });
    alert('You ve submitted' + JSON.stringify(data));
  }
}
