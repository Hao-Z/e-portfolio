import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { LicenseCertification } from 'src/app/core/models/license-certification.model';
import { ApiService } from 'src/app/core/services/api.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { userID } from 'src/global';

@Component({
  selector: 'app-modal-license-certification',
  templateUrl: '../modal.component.html',
  styleUrls: ['./modal-license-certification.component.css']
})
export class ModalLicenseCertificationComponent implements OnInit {

  title: string = `License Certification`;

  form = new FormGroup({});
  options: FormlyFormOptions = {};
  model: LicenseCertification;
  fields: FormlyFieldConfig[] = [
    {
      key: 'name',
      type: 'input',
      templateOptions: {
        label: 'Name',
        required: true
      }
    },
    {
      key: 'issuingOrganization',
      type: 'input',
      templateOptions: {
        label: 'Issuing Organization',
      }
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-6',
          key: 'issueDate',
          type: 'datepicker',
          templateOptions: {
            label: 'Issue Date',
            placeholder: 'dd-MM-yyyy',
          }
        },
        {
          className: 'col-6',
          key: 'expirationDate',
          type: 'datepicker',
          templateOptions: {
            placeholder: 'dd-MM-yyyy',
            label: 'Expiration Date',
          }
        }
      ]
    },
    {
      key: 'credentialID',
      type: 'input',
      templateOptions: {
        label: 'Credential ID'
      }
    },
    {
      key: 'credentialURL',
      type: 'input',
      templateOptions: {
        label: 'Credential URL'
      }
    },
    {
      key: 'media',
      type: 'input',
      templateOptions: {
        label: 'Media'
      }
    }
  ]

  constructor(
    public modal: NgbActiveModal,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.model = {
      name: null,
      issuingOrganization: null,
      issueDate: null,
      expirationDate: null,
      credentialID: null,
      credentialURL: null,
      media: null,
    }
  }

  onSubmit() {
    console.log("CV LC submit form:", this.model);
		if (this.form.valid) {
      this.apiService.create(userID, this.model, this.title.toLowerCase().split(" ").join(""))
        .subscribe((result: LicenseCertification) => {
          console.log("CV LC create response:", JSON.stringify(result))
        })
    }
  }

}
