import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { WorkExperience } from 'src/app/core/models/work-experience.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/core/services/api.service';
import { userID } from 'src/global';
import { DataService } from '../../core/services/data.service';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-modal-work-experience',
  templateUrl: '../modal.component.html',
  styleUrls: ['./modal-work-experience.component.css']
})
export class ModalWorkExperienceComponent implements OnInit {

  title: string = `Work Experience`;
  classname: string = `workexperience`;
  isNew: boolean = true;

  model: WorkExperience;
  form = new FormGroup({});
  options: FormlyFormOptions = {}; 
  fields: FormlyFieldConfig[] = [
    {
      key: 'title',
      type: 'input',
      templateOptions: {
        label: 'Title',
        require: true
      }
    },
    {
      key: 'employmentType',
      type: 'input',
      templateOptions: {
        label: 'Employment Type'
      }
    },
    {
      key: 'companyName',
      type: 'input',
      templateOptions: {
        label: 'Company Name'
      }
    },
    {
      key: 'location',
      type: 'input',
      templateOptions: {
        label: 'Location'
      }
    },
    {
      key: 'industry',
      type: 'select',
      templateOptions: {
        label: 'Industry',
        required: true,
        placeholder: "Choose an industry...",
        options: this.dataService.getIndustry()
      }
    },
    {
      key: 'isCurrentWork',
      type: 'checkbox',
      templateOptions: {
        label: 'Is Current Work',
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
    private dataService: DataService,
    private apiService: ApiService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    if (this.isNew) {
      this.model = {
        id: null,
        title: null,
        employmentType: null,
        companyName: null,
        location: null,
        industry: null,
        isCurrentWork: null,
        startDate: null,
        endDate: null,
        description: null,
        media: null,
      }
    }
  }

  onSubmit() {
    console.log("CV WE submit form:", this.model);
		if (this.form.valid) {
      this.apiService.create(userID, this.model, this.classname)
        .subscribe(() => {
          this.alertService.success("Successfully modified the Work Experience section!");
        })
    }
  }

}
