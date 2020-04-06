import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cvs',
  templateUrl: './cvs.component.html',
  styleUrls: ['./cvs.component.css']
})
export class CVsComponent implements OnInit {

  constructor() { }
  isCollapsed = false;
  CVs = ["Name 1","Name 2","Name 3","Name 4","Name 5","Name 6","Name 7"];
  ngOnInit(): void {
  }

}
