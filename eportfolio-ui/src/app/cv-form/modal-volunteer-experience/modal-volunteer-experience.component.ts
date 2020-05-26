import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { VolunteerExperience } from 'src/app/core/models/volunteer-experience.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/core/services/api.service';
import { userID } from 'src/global';
import { AlertService } from 'src/app/core/services/alert.service';
import { FileService } from 'src/app/core/services/file.service';

@Component({
  selector: 'app-modal-volunteer-experience',
  templateUrl: '../modal.component.html',
  styleUrls: ['./modal-volunteer-experience.component.css']
})
export class ModalVolunteerExperienceComponent implements OnInit {

  title: string = `Volunteer Experience`;
  classname: string = `volunteerexperience`
  isNew: boolean = true;

  model: VolunteerExperience;
  form = new FormGroup({});
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'organizationName',
      type: 'input',
      templateOptions: {
        label: 'Organization Name',
        required: true
      }
    },
    {
      key: 'role',
      type: 'input',
      templateOptions: {
        label: 'role'
      }
    },
    {
      key: 'cause',
      type: 'textarea',
      templateOptions: {
        label: 'cause',
      }
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-6',
          key: 'startDate',
          type: 'datepicker',
          templateOptions: {
            label: 'Start Date',
            placeholder: 'dd-MM-yyyy',
          }
        },
        {
          className: 'col-6',
          key: 'endDate',
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
        organizationName: null,
        role: null,
        cause: null,
        startDate: null,
        endDate: null,
        description: null,
        media: null,
      }
      this.fileService.msgToTem(this.model.media)
    } else {
      this.get()
    }
  }

  get() {
    this.apiService.get(userID, this.classname, this.model.id)
      .subscribe((result: VolunteerExperience) => {
        if (result) {
          this.model = result;
          this.fileService.msgToTem(this.model.media)
        }
      })
  }

  onSubmit() {
    console.log("CV VE submit form:", this.model);
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
