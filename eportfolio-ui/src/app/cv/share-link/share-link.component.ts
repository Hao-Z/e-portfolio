import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UniqueApiService } from 'src/app/core/services/unique-api.service';
import * as globals from "../../../global";
import { userID } from 'src/global';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { DataService } from 'src/app/core/services/data.service';
import { SharePeriod } from 'src/app/core/models/share-period.model';

@Component({
  selector: 'app-share-link',
  templateUrl: './share-link.component.html',
  styleUrls: ['./share-link.component.css']
})
export class ShareLinkComponent implements OnInit {

  sharelink: string

  model: SharePeriod = {
    period: '10',
    unit: '86400000'
  };
  form = new FormGroup({});
  options: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-6',
          key: 'period',
          type: 'input',
          modelOptions: {
            updateOn: 'submit',
          },
          templateOptions: {
            type: 'number',
            min: 0,
            required: true,
            label: 'Set validity period of the link',
            maxLength: 255            
          }
        },
        {
          className: 'col-6',
          key: 'unit',
          type: 'select',
          modelOptions: {
            updateOn: 'submit',
          },
          templateOptions: {
            label: 'Unit',
            maxLength: 255,
            required: true,
            options: this.dataService.getUnit()
          }
        }
      ]
    }
  ]

  constructor(
    public modal: NgbActiveModal,
    private apiService: UniqueApiService,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.getLink();
  }

  onSubmit() {
    this.ngOnInit()
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
    this.apiService.getSharedLink(userID, this.model)
      .subscribe((result: string) => {
        this.sharelink = `${globals.front_path}cv-show?link=${result}`;
    }) 
  }
}
