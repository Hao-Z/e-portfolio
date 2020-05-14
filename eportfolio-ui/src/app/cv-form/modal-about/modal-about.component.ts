import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { About } from 'src/app/core/models/about.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AboutApiService } from 'src/app/core/services/about-api.service';
import { userID } from 'src/global';

@Component({
  selector: 'app-modal-about',
  templateUrl: '../modal.component.html',
  styleUrls: ['./modal-about.component.css']
})
export class ModalAboutComponent implements OnInit {

  title: string = `About`;
  
  form = new FormGroup({});
  options: FormlyFormOptions = {};
  model: About;
  fields: FormlyFieldConfig[] = [
    {
      key: 'summary',
      type: 'textarea',
      templateOptions: {
        label: 'Summary',
      },
      hooks: {
        onInit: (field: FormlyFieldConfig) => {
          field.templateOptions.rows = 5
        }
      }
    }
  ]


  constructor(
    public modal: NgbActiveModal,
    private aboutApiService: AboutApiService
  ) { }

  ngOnInit(): void {
    this.model = {
      summary: null
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.aboutApiService.create(userID, this.model)
        .subscribe((result: About) => {
          console.log("CV About create response:", JSON.stringify(result))
        })
    }
  }

}
