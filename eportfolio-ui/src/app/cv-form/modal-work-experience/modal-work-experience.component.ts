import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { WorkExperience } from 'src/app/core/models/work-experience.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/core/services/api.service';
import { userID } from 'src/global';
import { DataService } from '../../core/services/data.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { FileService } from 'src/app/core/services/file.service';

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
        required: true,
        maxLength: 255
      }
    },
    {
      key: 'employmentType',
      type: 'select',
      templateOptions: {
        label: 'Employment Type',
        placeholder: "-",
        options: this.dataService.getEmplogymentType()
      }
    },
    {
      key: 'companyName',
      type: 'input',
      templateOptions: {
        label: 'Company Name',
        maxLength: 255
      }
    },
    {
      key: 'location',
      type: 'input',
      templateOptions: {
        label: 'Location',
        maxLength: 255
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
      defaultValue: false,
      templateOptions: {
        label: 'Is Current Work',
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
            pattern: "(((0[1-9]|[12][0-9]|3[01])-((0[13578]|1[02]))|((0[1-9]|[12][0-9]|30)-(0[469]|11))|(0[1-9]|[1][0-9]|2[0-8])-(02))-([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3}))|(29-02-(([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00)))"
          }
        },
        {
          className: 'col-6',
          key: 'endDate',
          type: 'datepicker',
          templateOptions: {
            placeholder: 'dd-MM-yyyy',
            label: 'End Date',
            pattern: "(((0[1-9]|[12][0-9]|3[01])-((0[13578]|1[02]))|((0[1-9]|[12][0-9]|30)-(0[469]|11))|(0[1-9]|[1][0-9]|2[0-8])-(02))-([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3}))|(29-02-(([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00)))"
          },
          expressionProperties: {
            'templateOptions.disabled': '!model.startDate',
            'model.endDate': '!model.startDate ? null : model.endDate'
          }
        }
      ]
    },
    {
      key: 'description',
      type: 'textarea',
      templateOptions: {
        label: 'Description',
        maxLength: 2048
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
    private dataService: DataService,
    private apiService: ApiService,
    private alertService: AlertService,
    public fileService: FileService
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
        isCurrentWork: false,
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
      .subscribe((result: WorkExperience) => {
        if (result) {
          this.model = result;
          this.fileService.msgToTem(this.model.media)
        }
      })
  }

  onSubmit() {
    console.log("CV WE submit form:", this.model);
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
