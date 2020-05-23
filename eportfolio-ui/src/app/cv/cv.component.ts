import { Component, OnInit} from '@angular/core';
import { UniqueApiService } from "../core/services/unique-api.service";
import { userID, refreshJwt } from "../../global";
import { ModalService } from '../core/services/modal.service';
import { Cv } from '../core/models/cv.model';
import { AlertService } from '../core/services/alert.service';
import { NzMessageService } from 'ng-zorro-antd';


@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css']
})
export class CvComponent implements OnInit{

  constructor(
    public modalService: ModalService,
    private uniqueApiService: UniqueApiService,
    private alertService: AlertService,
    private pop: NzMessageService
  ) {
      this.alertService.messageSuObserve.subscribe((res: string) => {
        this.refresh(true, res)
    })
      this.alertService.messageErObserve.subscribe((res: string) => {
        this.refresh(false, res)
  })
   };
  
  cvForms: Cv;
  cvItems: Array<string> = this.modalService.getKeys();  
  parentMessage: string;

  ngOnInit(): void {
    refreshJwt();
    this.getCv()
  }

  refresh(isSuccess: boolean, msg: string) {
    if (isSuccess) {
      this.pop.success(msg)      
    } else {
      this.pop.error(msg)     
    }
    this.ngOnInit()
  }

  getCv() {
    this.uniqueApiService.get(userID, "cv")
      .subscribe((result: Cv) => {
        this.cvForms = result;
        console.log("Cv get response:", JSON.stringify(result))
    })
  }

  editForm(className: string) {
    this.modalService.openModal(className, true)
  }
  
}
