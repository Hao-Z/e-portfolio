import { Component, OnInit } from '@angular/core';
import {NzFormatEmitEvent, NzTreeNodeOptions} from "ng-zorro-antd";
import { ActivatedRoute } from '@angular/router';
import { UniqueApiService } from '../core/services/unique-api.service';
import { Cv } from '../core/models/cv.model';
import { ModalService } from '../core/services/modal.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-cv-show',
  templateUrl: './cv-show.component.html',
  styleUrls: ['../cv/cv.component.css']
})
export class CvShowComponent implements OnInit {
  config;
  isCollapsed = window.innerWidth < Number(770);

  cvForms: Cv;
  cvItems: Array<string> = this.modalService.getKeys(); 
  avartarUrl: string = "assets/untitled.png" 

  constructor(
    private route: ActivatedRoute,
    public modalService: ModalService,
    private apiService: UniqueApiService
    ) { }

  ngOnInit(): void {
    this.getCv();
    // this.disableButt();

  }

  clickURL(url: string) {
    if (!url.startsWith("http")) {
        url = "http://" + url
    }
    window.open(url,"_blank")
  }

  // ngAfterViewInit(): void {
  //   this.disableButt()
  // }
  // disableButt() {

  //   let buttons: any = document.getElementsByClassName("fa")
  //   console.log(buttons.length)
  //   console.log(buttons)
    
  //   // for (var item of Array.from(buttons)) {
  //   //     // var butt = x as HTMLElement;
  //   //     // buttons[x]. = true;
  //   //     // butt.isConnected = false;
  //   //     console.log(item)
  //   // }
  // }

  getCv(): void {
    var link_info: string = this.route.snapshot.queryParamMap.get('link');
    var target_id;
    if (!isNaN(Number(link_info))) {
      target_id = link_info;
      link_info = null;
    } else {
      target_id = JSON.parse(atob(link_info.split('.')[1]))['read_only_id']
    }
    this.apiService.getSharedCv(target_id, link_info)
      .subscribe((result: Cv) => {
        this.cvForms = result;
        this.setAvartar();
        console.log("Cv get response:", JSON.stringify(result))
    })
  }

  setAvartar(): void {
    if (this.cvForms.introduction.profilePhoto) {
      this.avartarUrl = this.cvForms.introduction.profilePhoto;
    }
  }

  // getCvFromID() {
  //   this.apiService.get(userID, "cv")
  //     .subscribe((result: Cv) => {
  //       this.cvForms = result;
  //       console.log("Cv get response:", JSON.stringify(result))
  //   })
  // }


}
