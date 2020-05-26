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
  classname: string = `introduction`
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
    // {
    //   key: 'profilePhoto',
    //   type: 'file',
    //   templateOptions: {
    //     label: 'Profile (Maximum size: 1 MB)',
    //     fileheader: this.fileService.getUploadHeader(),
    //     action: this.fileService.getUploadUrl(userID),
    //     showbutton: true
    //   }
    // } 
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
      this.apiService.update(userID, this.model, this.title.toLowerCase())
        .subscribe(() => {
          this.alertService.success(`Successfully modified the ${this.title} section!`);
        })
    }
  }

}
