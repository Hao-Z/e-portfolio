import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { Publication } from 'src/app/core/models/publication.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/core/services/api.service';
import { userID } from 'src/global';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-modal-publication',
  templateUrl: '../modal.component.html',
  styleUrls: ['./modal-publication.component.css']
})
export class ModalPublicationComponent implements OnInit {

  title: string = `Publication`;
  classname: string = `publication`;
  isNew: boolean = true;

  model: Publication;
  form = new FormGroup({});
  options: FormlyFormOptions = {};
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
    private apiService: ApiService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    if (this.isNew) {
      this.model = {
        id: null,
        title: null,
        publicationPublisher: null,
        publicationDate: null,
        publicationURL: null,
        description: null,
        media: null,
      }
    }
  }

  onSubmit() {
    console.log("CV publication submit form:", this.model);
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
