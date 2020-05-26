import { Component, OnInit } from '@angular/core';
import {NzFormatEmitEvent, NzTreeNodeOptions} from "ng-zorro-antd";
import { ActivatedRoute } from '@angular/router';
import { UniqueApiService } from '../core/services/unique-api.service';
import { Cv } from '../core/models/cv.model';
import { ModalService } from '../core/services/modal.service';
@Component({
  selector: 'app-cv-show',
  templateUrl: './cv-show.component.html',
  styleUrls: ['../cv/cv.component.css']
})
export class CvShowComponent implements OnInit {
  config;
  isCollapsed = window.innerWidth < Number(770);
  lineitem = '2020';
  userDatas = {
    firstName: 'Chuqiao',
    lastName: 'Chen',
    headline: 'Student of the University of Melbourne',
    education: 'the University of Melbourne',
    industry: 'Information Technology',
    region: 'Melbourne, VIC',
    email: 'chuqiao.chen@gmail.com',
    phone: '(+61)0400000000',
    profileUrl: 'www.xxxxxxxx.com'
  };
  experiences = [
    {
      time: '2019.05 - 2020.03',
      detail: 'University of Melbourne'
    },
    {
      time: '2019.05 - 2020.03',
      detail: 'University of Melbourne'
    }
  ]
  cvData = [
    {'block': 'Education'},
    {'block': 'Work Experience'},
    {'block': 'Skills'}
  ];
  tempCVs = [
    {'industry': 'Information Technology'},
    {'industry': 'Computer Software'},
    {'industry': 'Computer Games'},
    {'industry': 'Computer Hardware'},
    {'industry': 'Computer Networking'},
  ];

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
    // this.disableButt()
  }

  // disableButt() {
  //   var buttons = document.getElementsByClassName('fa');
  //   console.log(buttons[1] as HTMLElement)
  //   // for (var x in buttons) {
  //   //     // var butt = x as HTMLElement;
  //   //     console.log(x)
  //   //     x.hidden = true;
  //   //     // butt.isConnected = false;
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
