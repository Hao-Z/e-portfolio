import { Component, OnInit, Type } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IntroductionApiService } from "../core/services/introduction-api.service";
import { userID, refreshJwt } from "../../global";
import { Introduction } from '../core/models/introduction.model';
import { ModalService } from '../core/services/modal.service';


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
    private ngbModalService: NgbModal,
    private modalService: ModalService,
    private introductionApiService: IntroductionApiService
    ) { }

  ngOnInit(): void {
    refreshJwt();
    this.getIntroduction();
  }

  openModal(className: string) {
    var modalComp: Component;
    this.modalService.getModal(className).subscribe(res => {
      modalComp = res;
    })
    this.ngbModalService.dismissAll;
    var modalRef = this.ngbModalService.open(modalComp, {backdrop: 'static', size: 'lg'})
    modalRef.componentInstance.title = this.modalService.getTitle(className)
    modalRef.result.then(
      () => {
        setTimeout(() => {
          this.ngOnInit();
        }, 100);
      });
  }

  getIntroduction() {
    this.introductionApiService.get(userID)
      .subscribe((result: Introduction) => {
        this.userDatas = result;
        console.log("Get!")
        console.log("CV get response:", JSON.stringify(result))
    })
  }
  
}
