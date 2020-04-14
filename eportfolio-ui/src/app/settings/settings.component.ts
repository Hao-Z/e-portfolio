import {Component, Injectable, OnInit} from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})

@Injectable()
export class SettingsComponent implements OnInit {

  settings = ["Make CV private",];
  checkbox = new Map<string,boolean>();

  constructor(private http: HttpClient) { }
  isCollapsed = true;
  ngOnInit(): void {



  }

  checkbox = false;

  onClickSetting(data) {
    this.http.post("http://localhost:8080/updatesetting", data).subscribe((result) => {
      // This code will be executed when the HTTP call returns successfully
    });
    alert('Changes succeed: ' + JSON.stringify(data));
  }
}
