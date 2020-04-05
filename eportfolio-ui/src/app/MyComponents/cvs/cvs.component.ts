import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cvs',
  templateUrl: './cvs.component.html',
  styleUrls: ['./cvs.component.css']
})
export class CVsComponent implements OnInit {

  constructor() { }

  test = ['Name1','Name2','Name3','Name4','Name5','Name6','Name7','Name8','Name9','Name10']

  ngOnInit(): void {
  }

}
