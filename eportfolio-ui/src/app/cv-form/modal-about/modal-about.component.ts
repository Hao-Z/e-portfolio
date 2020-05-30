import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { About } from 'src/app/core/models/about.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { userID } from 'src/global';
import { UniqueApiService } from 'src/app/core/services/unique-api.service';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-modal-about',
  templateUrl: '../modal.component.html',
  styleUrls: ['./modal-about.component.css']
})
export class ModalAboutComponent implements OnInit {

  title: string = `About`;
  classname: string = `about`;
  isNew: boolean = true;
  
  model: About;
  form = new FormGroup({});
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'summary',
      type: 'textarea',
      templateOptions: {
        label: 'Summary',
        maxLength: 2048
      },
      hooks: {
        onInit: (field: FormlyFieldConfig) => {
          field.templateOptions.rows = 6
        }
      }
    }
  ]

  constructor(
    public modal: NgbActiveModal,
    private apiService: UniqueApiService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    if (this.isNew) {
      this.model = {
        summary: null
      }
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.apiService.create(userID, this.model, this.classname).subscribe();
      this.alertService.success(`Successfully modified the ${this.title} section!`);
    }
  }

}
