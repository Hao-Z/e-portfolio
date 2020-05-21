import { Component, OnInit, Type } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UniqueApiService } from "../core/services/unique-api.service";
import { userID, refreshJwt } from "../../global";
import { Introduction } from '../core/models/introduction.model';
import { ModalService } from '../core/services/modal.service';
import { Cv } from '../core/models/cv.model';


@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css']
})
export class CvComponent implements OnInit {

  constructor(
    private ngbModalService: NgbModal,
    public modalService: ModalService,
    private uniqueApiService: UniqueApiService
  ) { }
  
  introForm: Introduction;
  cvForms: Cv;
  cvItems: Array<string> = this.modalService.getKeys();  
  a : string = 'introduction'

  ngOnInit(): void {
    refreshJwt();
    this.getIntroduction();
    this.getCv()
    console.log(this.cvItems)
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
    this.uniqueApiService.get(userID, "introduction")
      .subscribe((result: Introduction) => {
        this.introForm = result;
        console.log("Inntro get response:", JSON.stringify(result))
    })
  }

  getCv() {
    this.uniqueApiService.get(userID, "cv")
      .subscribe((result: Cv) => {
        this.cvForms = result;
        console.log("Cv get response:", JSON.stringify(result))
    })
  }
  
}
