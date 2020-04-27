import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core'
import { HttpClient } from '@angular/common/http'
import { DataService } from '../core/data.service';

@Component({
  selector: 'app-cv-intro',
  templateUrl: './cv-intro.component.html',
  styleUrls: ['./cv-intro.component.scss']
})
export class CvIntroComponent implements OnInit {

  form = new FormGroup({});
  options: FormlyFormOptions = {};

  model = {
    firstName: 'Chuqiao',
    lastName: 'Chen',
    headline: "",
    industry : "",
    currentPosition: "",
    currentEducation: "",
    gender: 3,
    dateOfBirth: "",
    country: "",
    postalCode: "",
    email: "",
    phone: "",
    address: "",
    profilePhoto: "",
  }

  fields: FormlyFieldConfig[] = [
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
      key: 'industry ',
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
      template: '<hr />',
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
      key: 'dateOfBirth',
      type: 'datepicker',
      templateOptions: {
        label: 'Date of Birth',
        placeholder: 'yyyy-mm-dd',
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
    private dataService: DataService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    alert(JSON.stringify(this.model));
    
		// if (this.form.valid) {
    //   this.http.post('url', this.model, null).subscribe((response) => {
    //     console.log('response:', response)
    //   }, (error) => {
    //     console.error('error:', error)
    //   })
    // }
  }
}
