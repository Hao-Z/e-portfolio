import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UniqueApiService } from 'src/app/core/services/unique-api.service';
import * as globals from "../../../global";
import { userID } from 'src/global';

@Component({
  selector: 'app-share-link',
  templateUrl: './share-link.component.html',
  styleUrls: ['./share-link.component.css']
})
export class ShareLinkComponent implements OnInit {

  sharelink: string

  constructor(
    public modal: NgbActiveModal,
    private apiService: UniqueApiService
  ) { }

  ngOnInit() {
    this.getLink();
  }

  copyText(){
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.sharelink;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  getLink() {
    this.apiService.getSharedLink(userID)
      .subscribe((result: string) => {
        this.sharelink = `${globals.front_path}cv-show?link=${result}`;
    })
  }
}
