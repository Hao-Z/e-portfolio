import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core'
import { DataService } from '../../core/services/data.service';
import { userID, refreshJwt } from "../../../global";
import { IntroductionApiService } from "../../core/services/introduction-api.service";
import { Introduction } from "../../core/models/introduction.model";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-introduction',
  templateUrl: './modal-introduction.component.html',
  styleUrls: ['./modal-introduction.component.css']
})
export class ModalIntroductionComponent implements OnInit {

  title: string = `Introduction`;

  form = new FormGroup({});
  options: FormlyFormOptions = {};
  model:Introduction 
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
          }
        },
        {
          className: 'col-6',
          key: 'lastName',
          type: 'input',
          templateOptions: {
            label: 'Last Name',
          },
          expressionProperties: {
            // 'templateOptions.disabled': '!model.firstName',
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
      key: 'currentPosition',
      type: 'input',
      templateOptions: {
        label: 'Current Position'
      }
    },
    {
      key: 'currentEducation',
      type: 'input',
      templateOptions: {
        label: 'Current Education'
      }
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
            maxLength: 20
          }
        },
        {
          className: 'col-6',
          key: 'postalCode',
          type: 'input',
          templateOptions: {
            label: 'Postal Code',
            pattern: "^[0-9]{4}$"
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
            minLength: 3,
            pattern: "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          }
        },
        {
          className: 'col-6',
          key: 'phoneNumber',
          type: 'input',
          templateOptions: {
            label: 'Phone',
            pattern: "^[0-9]{10,11}$"
          }
        }
      ]
    },
    {
      key: 'address',
      type: 'input',
      templateOptions: {
        label: 'Address',
        maxLength: 200
      }
    }, 
    {
      key: 'profilePhoto',
      type: 'input',
      templateOptions: {
        type: 'file',
        label: 'Profile',
      }
    } 
  ];

  constructor(
    public modal: NgbActiveModal,
    private dataService: DataService,
    private introductionApiService: IntroductionApiService
  ) { }

  ngOnInit(): void {
    refreshJwt(); 
    this.getIntroduction();
  }

  getIntroduction() {
    this.introductionApiService.get(userID)
      .subscribe((result: Introduction) => {
        console.log("CV Intro get response: ", JSON.stringify(result))
        if (result) {
          this.model =result;
        }
      })
  }

  onSubmit() {
    console.log("CV Intro submit form:", this.model);
		if (this.form.valid) {
      this.introductionApiService.update(userID, this.model)
        .subscribe((result: Introduction) => {
          console.log("CV Intro patch response:", JSON.stringify(result))
        })
    }
  }

}
