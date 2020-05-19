import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { VolunteerExperience } from 'src/app/core/models/volunteer-experience.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/core/services/api.service';
import { userID } from 'src/global';

@Component({
  selector: 'app-modal-volunteer-experience',
  templateUrl: '../modal.component.html',
  styleUrls: ['./modal-volunteer-experience.component.css']
})
export class ModalVolunteerExperienceComponent implements OnInit {

  title: string = `Volunteer Experience`;
  className: string = `volunteerexperience`

  form = new FormGroup({});
  options: FormlyFormOptions = {};
  model: VolunteerExperience;
  fields: FormlyFieldConfig[] = [
    {
      key: 'organizationName',
      type: 'input',
      templateOptions: {
        label: 'Organization Name',
        required: true
      }
    },
    {
      key: 'role',
      type: 'input',
      templateOptions: {
        label: 'role'
      }
    },
    {
      key: 'cause',
      type: 'textarea',
      templateOptions: {
        label: 'cause',
      }
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-6',
          key: 'startDate',
          type: 'datepicker',
          templateOptions: {
            label: 'Start Date',
            placeholder: 'dd-MM-yyyy',
          }
        },
        {
          className: 'col-6',
          key: 'endDate',
          type: 'datepicker',
          templateOptions: {
            placeholder: 'dd-MM-yyyy',
            label: 'End Date',
          }
        }
      ]
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
      organizationName: null,
      role: null,
      cause: null,
      startDate: null,
      endDate: null,
      description: null,
      media: null,
    }
  }

  onSubmit() {
    console.log("CV VE submit form:", this.model);
    if (this.form.valid) {
      this.apiService.create(userID, this.model, this.className)
        .subscribe((result: VolunteerExperience) => {
          console.log("CV VE create response:", JSON.stringify(result))
        })
    }
  }

}
