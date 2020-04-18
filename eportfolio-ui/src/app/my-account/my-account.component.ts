import {Component, Injectable, OnInit} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import * as globals from "../../global";

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})

@Injectable()
export class MyAccountComponent implements OnInit {
  isCollapsed = false;
  updateForm: FormGroup;
  profiles_value = new Map<string,any>();
  editable = new Map<string,boolean>();
  controlsConfig : {[key:string]:any} = {};
  profiles = ['User Name', 'Email', 'Birthday', 'Phone Number'];

  constructor(private http: HttpClient, private route: ActivatedRoute, private formBuilder: FormBuilder) {

    //TODO: Specify each input field.
    for(let p of this.profiles){
      this.controlsConfig[p] = [''];
    }
    this.updateForm = this.formBuilder.group(this.controlsConfig);
  }

  ngOnInit(): void {
    // this.getProfile();
    for(let p of this.profiles){
      this.profiles_value.set(p,p+"_value");
    }
    for(let p of this.profiles){
      this.editable.set(p,false);
    }
  }

  getProfile(){
    this.http.get(globals.backend_path + "getprofile").subscribe((result:any)=>{
      this.profiles_value = result;
    });
  }

  onSubmit(data) {
    this.http.put(globals.backend_path + "updateprofile", data).subscribe((result) => {
      // This code will be executed when the HTTP call returns successfully
    });
    alert('Changes succeed: ' + JSON.stringify(data));
  }

}
