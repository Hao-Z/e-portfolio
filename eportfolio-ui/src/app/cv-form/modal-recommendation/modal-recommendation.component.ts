import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { Recommendation } from 'src/app/core/models/recommendation.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/core/services/api.service';
import { userID } from 'src/global';
import { AlertService } from 'src/app/core/services/alert.service';

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
        required: true
      }
    },
    {
      key: 'referrerTitle',
      type: 'input',
      templateOptions: {
        label: 'Referrer Title',
      }
    },
    {
      key: 'description',
      type: 'textarea',
      templateOptions: {
        label: 'Description',
      },
      hooks: {
        onInit: (field: FormlyFieldConfig) => {
          field.templateOptions.rows = 3
        }
      }
    },
    {
      key: 'media',
      type: 'input',
      templateOptions: {
        type: 'file',
        label: 'Media',
      }
    }
  ]

  constructor(
    public modal: NgbActiveModal,
    private apiService: ApiService,
    private alertService: AlertService
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
    }
  }

  onSubmit() {
    console.log("CV Recommendation submit form:", this.model);
		if (this.form.valid) {
      if (this.isNew) {
        this.apiService.create(userID, this.model, this.classname)
          .subscribe(() => {
            this.alertService.success(`Successfully added the ${this.title} section!`);
          })
      } else {
        this.apiService.update(userID, this.model, this.classname, this.model.id)
          .subscribe(() => {
            this.alertService.success(`Successfully modified the ${this.title} section!`);
          })
      }
    }
  }

}
