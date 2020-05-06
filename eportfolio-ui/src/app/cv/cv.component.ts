import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalEducationComponent } from "../cv-form/modal-education/modal-education.component";
import { ModalIntroductionComponent } from "../cv-form/modal-introduction/modal-introduction.component"

const userDatas = {
  firstName: 'Chuqiao',
  lastName: 'Chen',
  headline: 'Student of the University of Melbourne',
  education: 'the University of Melbourne',
  industry: 'Information technology',
  region: 'Melbourn, VIC',
  email: 'chuqiao.chen@gmail.com',
  phone: '(61)0400000000',
  profileUrl: 'www.xxxx.xxxxxxxxxxxx.xxx'
  };

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css']
})
export class CvComponent implements OnInit {
 
  title = 'app';

  public userDatas: {
    firstName: string,
    lastName: String,
    headline: String,
    education: String,
    industry: String,
    region: String,
    email: String,
    phone: String,
    profileUrl: String
  } = userDatas

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  openModal(modalName: string) {
    switch (modalName) {
      case 'introduction':
        const modalIntroRef = this.modalService.open(ModalIntroductionComponent, {backdrop: 'static', size: 'lg'});
        break;
      case 'education':
        const modalEduRef = this.modalService.open(ModalEducationComponent, {backdrop: 'static', size: 'lg'});
        break;
      default:
        console.log("No such modal exists!");
        break;
    }
  }
  
}
