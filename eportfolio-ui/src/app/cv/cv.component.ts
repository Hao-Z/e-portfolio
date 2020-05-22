import { Component, OnInit, Type } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
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

  ngOnInit(): void {
    refreshJwt();
    this.getIntroduction();
    this.getCv()
    console.log(this.cvItems)
  }

  closeResult = '';

  openModal(className: string) {
    var modalComp: Component;
    this.modalService.getModal(className).subscribe(res => {
      modalComp = res;
    })
    this.ngbModalService.dismissAll;
    var modalRef = this.ngbModalService.open(modalComp, {backdrop: 'static', size: 'lg'})
    modalRef.componentInstance.title = this.modalService.getTitle(className)
    modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    }),
    () => {
      setTimeout(() => {
        this.ngOnInit();
      }, 100);
    };
  }
  
    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return `with: ${reason}`;
      }
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

  editForm(className: string) {
    this.openModal(className)
  }
  
}
