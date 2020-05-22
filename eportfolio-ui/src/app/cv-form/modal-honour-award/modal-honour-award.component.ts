import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { HonourAward } from 'src/app/core/models/honour-award.model';
import { ApiService } from 'src/app/core/services/api.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { userID } from 'src/global';

@Component({
  selector: 'app-modal-honour-award',
  templateUrl: '../modal.component.html',
  styleUrls: ['./modal-honour-award.component.css']
})
export class ModalHonourAwardComponent implements OnInit {

  title: string = `Honour Award`;

  form = new FormGroup({});
  options: FormlyFormOptions = {};
  model: HonourAward;
  fields: FormlyFieldConfig[] = [
    {
      key: 'title',
      type: 'input',
      templateOptions: {
        label: 'Title',
      }
    },
    {
      key: 'associatedWith',
      type: 'input',
      templateOptions: {
        label: 'Associated With',
      }
    },
    {
      key: 'issuer',
      type: 'input',
      templateOptions: {
        label: 'Issuer',
      }
    },
    {
      key: 'issueDate',
      type: 'datepicker',
      templateOptions: {
        label: 'Issue Date',
        placeholder: 'dd-MM-yyyy',
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
    }
  ]

  constructor(
    public modal: NgbActiveModal,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.model = {
      id: null,
      title: null,
      associatedWith: null,
      issuer: null,
      issueDate: null,
      description: null,
    }
  }

  onSubmit() {
    console.log("CV HA submit form:", this.model);
		if (this.form.valid) {
      this.apiService.create(userID, this.model, this.title.toLowerCase().split(" ").join(""))
        .subscribe((result: HonourAward) => {
          console.log("CV HA create response:", JSON.stringify(result))
        })
    }
  }

}
