import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core'
import { HttpClient } from '@angular/common/http'
import { DataService } from '../core/data.service';
import { ActivatedRoute } from '@angular/router';
import { userID } from "../../global";
import { refreshJwt } from "../../global";
import { IntroductionApiService } from "../core/introduction-api.service";
import { Introduction } from "../dynamic-form/interfaces/introduction";

@Component({
  selector: 'app-cv-intro',
  templateUrl: './cv-intro.component.html',
  styleUrls: ['./cv-intro.component.scss']
})
export class CvIntroComponent implements OnInit {

  form = new FormGroup({});
  options: FormlyFormOptions = {};

  model:Introduction 
  //   = {
  //   firstName: 'Chuqiao',
  //   lastName: 'Chen',
  //   headline: "",
  //   industry : null,
  //   currentPosition: "",
  //   currentEducation: "",
  //   gender: 3,
  //   birthday: "",
  //   country: "",
  //   postalCode: "",
  //   email: "",
  //   phone: "",
  //   address: "",
  //   profilePhoto: "",
  // }

  fields: FormlyFieldConfig[] = [
    {
      template: '<hr class="hr1" />',
    },
    {
      key: 'firstName',
      type: 'input',
      templateOptions: {
        label: 'First Name',
        required: true,
      },
    },
    {
      key: 'lastName',
      type: 'input',
      templateOptions: {
        label: 'Last Name',
        required: true,
      },
      expressionProperties: {
        'templateOptions.disabled': '!model.firstName',
      }
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
          field.templateOptions.cols = 60,
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
      },
    },
    {
      key: 'currentPosition',
      type: 'input',
      templateOptions: {
        label: 'Current Position'
      },
    },
    {
      key: 'currentEducation',
      type: 'input',
      templateOptions: {
        label: 'Current Education'
      },
    },
    {
      template: '<hr class="hr2" />',
    },
    {
      key: 'gender',
      type: 'select',
      templateOptions: {
        label: 'Gender',
        options: this.dataService.getGender(),
      },
    },
    {
      key: 'birthday',
      type: 'datepicker',
      templateOptions: {
        label: 'Date of Birth',
        placeholder: 'yyyy-mm-dd',
        required: false
      },
    },
    {
      key: 'country',
      type: 'input',
      templateOptions: {
        label: 'Country',
        required: true,
        maxLength: 20
      },
    },
    {
      key: 'postalCode',
      type: 'input',
      templateOptions: {
        type: 'number',
        label: 'Postal Code',
        pattern: "^[0-9]{4}$"
      }
    },
    {
      template: '<hr class="hr3" />',
    },
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        type: 'email',
        label: 'Email',
        minLength: 3,
        pattern: "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
      },
    },
    {
      key: 'phone',
      type: 'input',
      templateOptions: {
        type: 'number',
        label: 'Phone',
        pattern: "^[0-9]{10,11}$"
      }
    },
    {
      key: 'address',
      type: 'input',
      templateOptions: {
        label: 'Address',
        maxLength: 200
      },
    },  
  ]

  constructor(private http: HttpClient, 
    private dataService: DataService,
    private introductionApiService: IntroductionApiService) { }

  ngOnInit(): void {
    refreshJwt();
    this.getIntroduction();
  }

  getIntroduction() {

    this.introductionApiService.getIntro(userID)
      .subscribe((result: any) => {
        console.log("get: " + 'response:', JSON.stringify(result.detail))
        if (result.detail) {
          console.log("success to show intro data!")
          this.model =result.detail as Introduction;
        }
    })
  }

  onSubmit() {
    console.log(this.model);
    
		if (this.form.valid) {
      this.introductionApiService.updateIntro(userID, this.model)
        .subscribe((result: any) => {
          console.log("patch: " + 'response:', JSON.stringify(result.body))
          if (result.body.detail) {
          }
        })
    }
  }
}
