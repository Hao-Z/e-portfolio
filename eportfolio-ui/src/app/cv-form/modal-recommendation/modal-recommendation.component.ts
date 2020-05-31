import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { Recommendation } from 'src/app/core/models/recommendation.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/core/services/api.service';
import { userID } from 'src/global';
import { AlertService } from 'src/app/core/services/alert.service';
import { FileService } from 'src/app/core/services/file.service';

@Component({
  selector: 'app-modal-recommendation',
  templateUrl: '../modal.component.html',
  styleUrls: ['./modal-recommendation.component.css']
})
export class ModalRecommendationComponent implements OnInit {

  title: string = `Recommendation`;
  classname: string = `recommendation`;
  isNew: boolean = true;

  model: Recommendation;
  form = new FormGroup({});
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'referrerName',
      type: 'input',
      templateOptions: {
        label: 'Referrer Name',
        required: true,
        maxLength: 255
      }
    },
    {
      key: 'referrerTitle',
      type: 'input',
      templateOptions: {
        label: 'Referrer Title',
        maxLength: 255
      }
    },
    {
      key: 'description',
      type: 'textarea',
      templateOptions: {
        label: 'Description',
        maxLength: 2048
      },
      hooks: {
        onInit: (field: FormlyFieldConfig) => {
          field.templateOptions.rows = 3
        }
      }
    },
    {
      key: 'media',
      type: 'file',
      templateOptions: {
        label: 'Media (Maximum size: 1 MB)',
        fileheader: this.fileService.getUploadHeader(),
        action: this.fileService.getUploadUrl(userID),
        showbutton: true
      }
    }
  ]

  constructor(
    public modal: NgbActiveModal,
    private apiService: ApiService,
    private alertService: AlertService,
    public fileService: FileService
  ) { }

  ngOnInit(): void {
    if (this.isNew) {
      this.model = {
        id: null,
        referrerName: null,
        referrerTitle: null,
        description: null,
        media: null,
      }
      this.fileService.msgToTem(this.model.media)
    } else {
      this.get()
    }
  }

  get() {
    this.apiService.get(userID, this.classname, this.model.id)
      .subscribe((result: Recommendation) => {
        if (result) {
          this.model = result;
          this.fileService.msgToTem(this.model.media)
        }
      })
  }

  onSubmit() {
    console.log("CV Recommendation submit form:", this.model);
		if (this.form.valid) {
      if (this.isNew) {
        this.apiService.create(userID, this.model, this.classname).subscribe();
        this.alertService.success(`Successfully added the ${this.title} section!`);
      } else {
        this.apiService.update(userID, this.model, this.classname, this.model.id).subscribe();
        this.alertService.success(`Successfully modified the ${this.title} section!`);
      }
    }
  }

}
