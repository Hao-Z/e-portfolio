import {Component, Injectable, OnInit} from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})

@Injectable()
export class SettingsComponent implements OnInit {

  settings = ["Make the CV private",];
  checkbox = new Map<string,boolean>();

  constructor(private http: HttpClient) { }
  isCollapsed = false;
  ngOnInit(): void {

    //getSetting();
    for(let s of this.settings){
      this.checkbox.set(s,false);
    }
  }

  getSetting(){
    this.http.get("http://localhost:8080/getsetting").subscribe((result:any)=>{
      this.checkbox = result;
    });
  }

  updateSetting(data) {
    this.http.put("http://localhost:8080/updatesetting", data).subscribe((result) => {
      // This code will be executed when the HTTP call returns successfully
    });
    alert('Changes succeed: ' + JSON.stringify(data));
  }
}
