import {Component, Injectable, OnInit} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})

@Injectable()
export class MyAccountComponent implements OnInit {
  isCollapsed = true;
  updateForm: FormGroup;
  profile: {[key:string]:any;} ;
  constructor(private http: HttpClient, private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.updateForm = this.formBuilder.group({
      'userName': [''],
      'email': [''],
      'Age': [''],
      'phoneNumber': ['']
    });
  }

  ngOnInit(): void {
    this.profile = {'userName':'Someone', 'Age':20, 'email':'demo@demo.com', 'phoneNumber':'X-XXX-XXX-XXX'};
    // this.getProfile()
  }

  getProfile(){
    this.http.get("http://localhost:8080/getprofile").subscribe((result:any)=>{
      this.profile = result;
    });
  }

  onSubmit(data) {
    this.http.post("http://localhost:8080/updateprofile", data).subscribe((result) => {
      // This code will be executed when the HTTP call returns successfully
    });
    alert('Changes succeed: ' + JSON.stringify(data));
  }

  editable: {[key:string]:boolean} = {
    'userName': false,
    'email': false,
    'Age': false,
    'phoneNumber': false
  };
}
