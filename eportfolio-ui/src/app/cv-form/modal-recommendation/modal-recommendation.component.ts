import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { Recommendation } from 'src/app/core/models/recommendation.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/core/services/api.service';
import { userID } from 'src/global';

@Component({
  selector: 'app-modal-recommendation',
  templateUrl: '../modal.component.html',
  styleUrls: ['./modal-recommendation.component.css']
})
export class ModalRecommendationComponent implements OnInit {

  title: string = `Recommendation`;

  form = new FormGroup({});
  options: FormlyFormOptions = {};
  model: Recommendation;
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
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.model = {
      id: null,
      referrerName: null,
      referrerTitle: null,
      description: null,
      media: null,
    }
  }

  onSubmit() {
    console.log("CV Recommendation submit form:", this.model);
		if (this.form.valid) {
      this.apiService.create(userID, this.model, this.title.toLowerCase())
        .subscribe((result: Recommendation) => {
          console.log("CV Recommendation create response:", JSON.stringify(result))
        })
    }
  }

}
