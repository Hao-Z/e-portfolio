import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { LicenseCertification } from 'src/app/core/models/license-certification.model';
import { ApiService } from 'src/app/core/services/api.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { userID } from 'src/global';
import { AlertService } from 'src/app/core/services/alert.service';
import { FileService } from 'src/app/core/services/file.service';

@Component({
  selector: 'app-modal-license-certification',
  templateUrl: '../modal.component.html',
  styleUrls: ['./modal-license-certification.component.css']
})
export class ModalLicenseCertificationComponent implements OnInit {

  title: string = `"License Certification`;
  classname: string = `licensecertification`;
  isNew: boolean = true;

  model: LicenseCertification;
  form = new FormGroup({});
  options: FormlyFormOptions = {};
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
      type: 'file',
      templateOptions: {
        label: 'Media (Maximum size: 1 MB)',
        fileheader: this.fileService.getUploadHeader(),
        action: this.fileService.getUploadUrl(userID),
        showbutton: true
      }
    }
  ]

  constructor(
    public modal: NgbActiveModal,
    private apiService: ApiService,
    private alertService: AlertService,
    public fileService: FileService
  ) { }

  ngOnInit(): void {
    if (this.isNew) {
      this.model = {
        id: null,
        name: null,
        issuingOrganization: null,
        issueDate: null,
        expirationDate: null,
        credentialID: null,
        credentialURL: null,
        media: null,
      }
      this.fileService.msgToTem(this.model.media)
    } else {
      this.get()
    }
  }
  
  get() {
    this.apiService.get(userID, this.classname, this.model.id)
      .subscribe((result: LicenseCertification) => {
        if (result) {
          this.model = result;
          this.fileService.msgToTem(this.model.media)
        }
      })
  }

  onSubmit() {
    console.log("CV LC submit form:", this.model);
		if (this.form.valid) {
      if (this.isNew) {
        this.apiService.create(userID, this.model, this.classname)
          .subscribe(() => {
            this.alertService.success(`Successfully added the ${this.title} section!`);
          })
      } else {
        this.apiService.update(userID, this.model, this.classname, this.model.id)
          .subscribe(() => {
            this.alertService.success(`Successfully modified the ${this.title} section!`);
          })
      }
    }
  }

}
