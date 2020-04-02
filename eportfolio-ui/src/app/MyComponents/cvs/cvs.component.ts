import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cvs',
  templateUrl: './cvs.component.html',
  styleUrls: ['./cvs.component.css']
})
export class CVsComponent implements OnInit {

  constructor() { }

  test = ['test1','test2','test3','test2','test3','test2','test3','test2','test3','test2','test3']

  ngOnInit(): void {
  }

}
