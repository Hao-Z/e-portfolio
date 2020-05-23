import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { Feature } from 'src/app/core/models/feature.model';
import { ApiService } from 'src/app/core/services/api.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { userID } from 'src/global';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-modal-feature',
  templateUrl: '../modal.component.html',
  styleUrls: ['./modal-feature.component.css']
})
export class ModalFeatureComponent implements OnInit {

  title: string = `Feature`;
  classname: string = `feature`;
  isNew: boolean = true;

  model: Feature;
  form = new FormGroup({});
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'link',
      type: 'input',
      templateOptions: {
        label: 'Link'
      }
    },
    {
      key: 'media',
      type: 'input',
      templateOptions: {
        label: 'Media'
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
        link: null,
        media: null
      }
    }
  }

  onSubmit() {
    console.log("CV Feature submit form:", this.model);
		if (this.form.valid) {
      this.apiService.create(userID, this.model, this.title.toLowerCase())
        .subscribe(() => {
          this.alertService.success(`Successfully modified the ${this.title} section!`);
        })
    }
  }

}
