import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UniqueApiService } from '../core/services/unique-api.service';
import { Cv } from '../core/models/cv.model';
import { ModalService } from '../core/services/modal.service';
import { FileService } from 'src/app/core/services/file.service';

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
  avartarUrl: string = "../../assets/untitled.png" 
  errorMessage: string;

  constructor(
    private route: ActivatedRoute,
    public modalService: ModalService,
    private apiService: UniqueApiService,
    private router: Router,
    public fileService: FileService
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
        },
        (err)=>{
          if (err.code == 403) {
            this.errorMessage = "Sorry, you are accessing a private account, please click the confirm button to return to the Explore page!"
          } else {
            this.errorMessage = err.message
          }
          this.showModal()
        })
  }

  setAvartar(): void {
    if (this.cvForms.introduction.profilePhoto) {
      this.avartarUrl = this.cvForms.introduction.profilePhoto;
    }
  }

  isVisible = false;

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
    this.router.navigateByUrl('/explore');
  }

  handleCancel(): void {
    this.isVisible = false;
  }

}
