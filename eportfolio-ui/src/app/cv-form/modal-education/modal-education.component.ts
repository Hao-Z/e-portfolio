import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Education } from '../../core/models/education.model';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { userID } from 'src/global';
import { ApiService } from "../../core/services/api.service";

@Component({
  selector: 'app-modal-education',
  templateUrl: '../modal.component.html',
  styleUrls: ['./modal-education.component.css']
})
export class ModalEducationComponent implements OnInit {

  title: string = `education`;

  form = new FormGroup({});
  options: FormlyFormOptions = {};
  model: Education;
  fields: FormlyFieldConfig[] = [
    {
      key: 'schoolName',
      type: 'input',
      templateOptions: {
        label: 'School Name',
        required: true
      }
    },
    {
      key: 'degree',
      type: 'input',
      templateOptions: {
        label: 'Degree',
      }
    },
    {
      key: 'fieldOfStudy',
      type: 'input',
      templateOptions: {
        label: 'Study Field',
      }
    },
    {
      key: 'grade',
      type: 'input',
      templateOptions: {
        label: 'Grade',
      }
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-6',
          key: 'startYear',
          type: 'datepicker',
          templateOptions: {
            label: 'Start Date',
            placeholder: 'dd-MM-yyyy',
          }
        },
        {
          className: 'col-6',
          key: 'endYear',
          type: 'datepicker',
          templateOptions: {
            placeholder: 'dd-MM-yyyy',
            label: 'End Date',
          }
        }
      ]
    },
    {
      key: 'activityAndSociety',
      type: 'textarea',
      templateOptions: {
        label: 'Activities And Societies',
      },
      hooks: {
        onInit: (field: FormlyFieldConfig) => {
          field.templateOptions.rows = 3
        }
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
  ];
  constructor( 
    public modal: NgbActiveModal,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.model = {
      schoolName: null,
      degree: null,
      fieldOfStudy: null,
      grade: null,
      startYear: null,
      endYear: null,
      activityAndSociety: null,
      description: null,
      media: null,
    }
  }

  onSubmit() {
    console.log("CV Edu submit form:", this.model);
		if (this.form.valid) {
      this.apiService.create(userID, this.model, this.title.toLowerCase().split(" ").join(""))
        .subscribe((result: Education) => {
          console.log("CV Edu create response:", JSON.stringify(result))
        })
    }
  }

}
