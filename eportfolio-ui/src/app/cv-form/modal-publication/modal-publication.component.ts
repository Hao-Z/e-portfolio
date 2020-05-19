import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { Publication } from 'src/app/core/models/publication.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/core/services/api.service';
import { userID } from 'src/global';

@Component({
  selector: 'app-modal-publication',
  templateUrl: '../modal.component.html',
  styleUrls: ['./modal-publication.component.css']
})
export class ModalPublicationComponent implements OnInit {

  title: string = `Education`;

  form = new FormGroup({});
  options: FormlyFormOptions = {};
  model: Publication;
  fields: FormlyFieldConfig[] = [
    {
      key: 'title',
      type: 'input',
      templateOptions: {
        label: 'Title',
        required: true
      }
    },
    {
      key: 'publicationPublisher',
      type: 'input',
      templateOptions: {
        label: 'Publication Publisher',
      }
    },
    {
      key: 'publicationDate',
      type: 'datepicker',
      templateOptions: {
        placeholder: 'dd-MM-yyyy',
        label: 'Publication Date',
      }
    },
    {
      key: 'publicationURL',
      type: 'input',
      templateOptions: {
        label: 'Publication URL'
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
      title: null,
      publicationPublisher: null,
      publicationDate: null,
      publicationURL: null,
      description: null,
      media: null,
    }
  }

  onSubmit() {
    console.log("CV publication submit form:", this.model);
		if (this.form.valid) {
      this.apiService.create(userID, this.model, this.title.toLowerCase())
        .subscribe((result: Publication) => {
          console.log("CV publication create response:", JSON.stringify(result))
        })
    }
  }

}
