import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core'
import { DataService } from '../../core/services/data.service';
import { userID } from "../../../global";
import { UniqueApiService } from "../../core/services/unique-api.service";
import { Introduction } from "../../core/models/introduction.model";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/core/services/alert.service';
import { FileService } from 'src/app/core/services/file.service';

@Component({
  selector: 'app-modal-introduction',
  templateUrl: './modal-introduction.component.html',
  styleUrls: ['./modal-introduction.component.css'],
})
export class ModalIntroductionComponent implements OnInit {

  title: string = `Introduction`;
  classname: string = `introduction`;
  isNew: boolean = true;

  model:Introduction
  form = new FormGroup({});
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-6',
          key: 'firstName',
          type: 'input',
          templateOptions: {
            label: 'First Name',
            required: true,
            maxLength: 255
          }
        },
        {
          className: 'col-6',
          key: 'lastName',
          type: 'input',
          templateOptions: {
            label: 'Last Name',
            maxLength: 255
          },
          expressionProperties: {
            'templateOptions.disabled': '!model.firstName',
            'model.lastName': '!model.firstName ? null : model.lastName'
          }
        }
      ]
    },
    {
      className: 'expandingArea',
      key: 'headline',
      type: 'textarea',
      templateOptions: {
        label: 'Headline',
        placeholder: 'Example: Developer at XX company.',
        maxLength: 2048
      },
      hooks: {
        onInit: (field: FormlyFieldConfig) => {
          field.templateOptions.rows = 3
        }
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
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-6',
          key: 'workingYear',
          type: 'input',
          templateOptions: {
            label: 'Working Years',
            options: this.dataService.getGender(),
            pattern: '^[0-9]{0,3}$',
            addonRight: {
              text: 'years',
            },
          }
        },
        {
          className: 'col-6',
          key: 'highestEducation',
          type: 'select',
          templateOptions: {
            placeholder: '-',
            label: 'The Highest Education',
            options: this.dataService.getDegree(),
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-6',
          key: 'gender',
          type: 'select',
          templateOptions: {
            label: 'Gender',
            options: this.dataService.getGender(),
          }
        },
        {
          className: 'col-6',
          key: 'birthday',
          type: 'datepicker',
          templateOptions: {
            placeholder: 'dd-MM-yyyy',
            label: 'Date of Birth',
            pattern: "(((0[1-9]|[12][0-9]|3[01])-((0[13578]|1[02]))|((0[1-9]|[12][0-9]|30)-(0[469]|11))|(0[1-9]|[1][0-9]|2[0-8])-(02))-([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3}))|(29-02-(([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00)))"
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-6',
          key: 'country',
          type: 'input',
          templateOptions: {
            label: 'Country',
            required: true,
            maxLength: 255
          }
        },
        {
          className: 'col-6',
          key: 'postalCode',
          type: 'input',
          templateOptions: {
            label: 'Postal Code',
            maxLength: 10
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-6',
          key: 'email',
          type: 'input',
          templateOptions: {
            type: 'email',
            label: 'Email',
            required: true,
            minLength: 3,
            maxLength: 255,
            pattern: "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          }
        },
        {
          className: 'col-6',
          key: 'phoneNumber',
          type: 'input',
          templateOptions: {
            label: 'Phone',
            maxLength: 15,
            pattern: "^[0-9]{3,15}$"
          }
        }
      ]
    },
    {
      key: 'address',
      type: 'input',
      templateOptions: {
        label: 'Address',
        maxLength: 255
      }
    }
  ];

  constructor(
    public modal: NgbActiveModal,
    private dataService: DataService,
    private apiService: UniqueApiService,
    private alertService: AlertService,
    public fileService: FileService
  ) {}

  ngOnInit(): void {
    this.getIntroduction();
  }

  getIntroduction() {
    this.apiService.get(userID, this.title.toLowerCase())
      .subscribe((result: Introduction) => {
        if (result) {
          this.model =result;
          this.fileService.msgToTem(this.model.profilePhoto)
        }
      })
  }

  onSubmit() {
    console.log("CV Intro submit form:", this.model);
		if (this.form.valid) {
      this.apiService.update(userID, this.model, this.classname).subscribe();
      this.alertService.success(`Successfully modified the ${this.title} section!`);
    }
  }

}
