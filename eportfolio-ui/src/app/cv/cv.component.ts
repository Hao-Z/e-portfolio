import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalEducationComponent } from "../cv-form/modal-education/modal-education.component";
import { ModalIntroductionComponent } from "../cv-form/modal-introduction/modal-introduction.component"
import { IntroductionApiService } from "../core/services/introduction-api.service";
import { userID, refreshJwt } from "../../global";
import { Introduction } from '../core/models/introduction.model';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css']
})
export class CvComponent implements OnInit {

  Object = Object;
  userDatas:Introduction;
  cvDatas: any = {
    "educations": [
      {
        "schoolName": "Unimelb"
      },
      {
        "schoolName": "Unimelb"
      }
    ]
  };

  constructor(
    private modalService: NgbModal,
    private introductionApiService: IntroductionApiService
    ) { }

  ngOnInit(): void {
    refreshJwt();
    console.log("Refresh!")
    this.getIntroduction();
  }

  openModal(modalName: string) {
    this.modalService.dismissAll;
    var modalRef: any;
    
    switch (modalName) {
      case 'introduction':
        modalRef = this.modalService.open(ModalIntroductionComponent, {backdrop: 'static', size: 'lg'});
        break;
      case 'education':
        modalRef = this.modalService.open(ModalEducationComponent, {backdrop: 'static', size: 'lg'});
        break;
      case 'about':
        console.log("about modal!");
        break;
      case 'feature':
        console.log("feature modal!");
        break;
      case 'workExperience':
        console.log("workExperience modal!");
        break;  
      case 'licenseCertification':
        console.log("licenseCertification modal!");
        break;
      case 'volunteerExperience':
        console.log("volunteerExperience modal!");
        break;
      case 'skill':
        console.log("skill modal!");
        break;
      case 'project':
        console.log("project modal!");
        break;
      case 'honourAward':
        console.log("honourAward modal!");
        break;
      case 'publication':
        console.log("publication modal!");
        break;
      case 'language':
        console.log("language modal!");
        break;      
      case 'recommendation':
        console.log("recommendation modal!");
        break;           
      default:
        console.log("No such modal exists!");
        break;
    }
    modalRef.result.then(
      () => {
        setTimeout(() => {
          this.ngOnInit();
        }, 100);
      });
  }

  getIntroduction() {
    this.introductionApiService.getIntro(userID)
      .subscribe((result: Introduction) => {
        this.userDatas = result;
        console.log("Get!")
        console.log("CV get response:", JSON.stringify(result))
    })
  }
  
}
