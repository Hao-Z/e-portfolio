import {Component, Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
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

  updateForm: FormGroup;
  profiles_value = new Map<string,any>();
  editable = new Map<string,boolean>();
  controlsConfig : {[key:string]:any} = {};
  profiles = ['username', 'email', 'birthday', 'phoneNumber'];
  userid : string ;

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
    this.http.get(globals.backend_path + this.userid + "/profile").subscribe((result:any)=>{
      this.profiles_value = result;
    });
  }

  Message : any;
  onSubmit(key, value) {
    //TODO:use PATCH to update profiles partially.
    if(key == 'email'){
      this.Message = JSON.parse("{\"user\":{\""+key+"\":\""+value+"\"}}")
    }else{
      this.Message = JSON.parse("{\""+key+"\":\""+value+"\"}")
    }

    this.http.patch(globals.backend_path + this.userid + "/profile", this.Message).subscribe((result) => {
      // This code will be executed when the HTTP call returns successfully
    });

    alert('Changes succeed: ' + JSON.stringify(this.Message));
  }

}
