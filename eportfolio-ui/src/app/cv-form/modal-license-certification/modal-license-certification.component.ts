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
        required: true,
        maxLength: 255
      }
    },
    {
      key: 'issuingOrganization',
      type: 'input',
      templateOptions: {
        label: 'Issuing Organization',
        maxLength: 255
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
            pattern: "(((0[1-9]|[12][0-9]|3[01])-((0[13578]|1[02]))|((0[1-9]|[12][0-9]|30)-(0[469]|11))|(0[1-9]|[1][0-9]|2[0-8])-(02))-([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3}))|(29-02-(([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00)))"
          }
        },
        {
          className: 'col-6',
          key: 'expirationDate',
          type: 'datepicker',
          templateOptions: {
            placeholder: 'dd-MM-yyyy',
            label: 'Expiration Date',
            pattern: "(((0[1-9]|[12][0-9]|3[01])-((0[13578]|1[02]))|((0[1-9]|[12][0-9]|30)-(0[469]|11))|(0[1-9]|[1][0-9]|2[0-8])-(02))-([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3}))|(29-02-(([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00)))"
          },
          expressionProperties: {
            'templateOptions.disabled': '!model.issueDate',
            'model.expirationDate': '!model.issueDate ? null : model.expirationDate'
          }
        }
      ]
    },
    {
      key: 'credentialID',
      type: 'input',
      templateOptions: {
        label: 'Credential ID',
        maxLength: 255
      }
    },
    {
      key: 'credentialURL',
      type: 'input',
      templateOptions: {
        label: 'Credential URL',
        maxLength: 255
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
        this.apiService.create(userID, this.model, this.classname).subscribe();
        this.alertService.success(`Successfully added the ${this.title} section!`);
      } else {
        this.apiService.update(userID, this.model, this.classname, this.model.id).subscribe();
        this.alertService.success(`Successfully modified the ${this.title} section!`);
      }
    }
  }

}
