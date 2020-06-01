import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Education } from '../../core/models/education.model';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { userID } from 'src/global';
import { ApiService } from "../../core/services/api.service";
import { AlertService } from 'src/app/core/services/alert.service';
import { FileService } from 'src/app/core/services/file.service';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-modal-education',
  templateUrl: '../modal.component.html',
  styleUrls: ['./modal-education.component.css']
})
export class ModalEducationComponent implements OnInit {

  title: string = `Education`;
  classname: string = `education`;
  isNew: boolean = true;

  model: Education;
  form = new FormGroup({});
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'schoolName',
      type: 'input',
      templateOptions: {
        label: 'School Name',
        required: true,
        maxLength: 255
      }
    },
    {
      key: 'degree',
      type: 'select',
      templateOptions: {
        label: 'Degree',
        placeholder: "Choose an degree...",
        options: this.dataService.getDegree()
      }
    },
    {
      key: 'fieldOfStudy',
      type: 'input',
      templateOptions: {
        label: 'Study Field',
        maxLength: 255
      }
    },
    {
      key: 'grade',
      type: 'input',
      templateOptions: {
        label: 'Grade',
        pattern: '^[0-9]{1,4}(.[0-9]{1,4}){0,1}$'
      }
    },
    {
      key: 'isDefault',
      type: 'checkbox',
      defaultValue: false,
      templateOptions: {
        label: 'Is Current Education',
      }
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-6',
          key: 'startYear',
          type: 'datepicker',
          templateOptions: {
            label: 'Start Date',
            placeholder: 'dd-MM-yyyy',
            pattern: "(((0[1-9]|[12][0-9]|3[01])-((0[13578]|1[02]))|((0[1-9]|[12][0-9]|30)-(0[469]|11))|(0[1-9]|[1][0-9]|2[0-8])-(02))-([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3}))|(29-02-(([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00)))"
          }
        },
        {
          className: 'col-6',
          key: 'endYear',
          type: 'datepicker',
          templateOptions: {
            placeholder: 'dd-MM-yyyy',
            label: 'End Date',
            pattern: "(((0[1-9]|[12][0-9]|3[01])-((0[13578]|1[02]))|((0[1-9]|[12][0-9]|30)-(0[469]|11))|(0[1-9]|[1][0-9]|2[0-8])-(02))-([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3}))|(29-02-(([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00)))"
          },
          expressionProperties: {
            'templateOptions.disabled': '!model.startYear',
            'model.endYear': '!model.startYear ? null : model.endYear'
          }
        }
      ]
    },
    {
      key: 'activityAndSociety',
      type: 'textarea',
      templateOptions: {
        label: 'Activities And Societies',
        maxLength: 2048
      },
      hooks: {
        onInit: (field: FormlyFieldConfig) => {
          field.templateOptions.rows = 3
        }
      }
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
  ];
  constructor( 
    public modal: NgbActiveModal,
    private dataService: DataService,
    private apiService: ApiService,
    private alertService: AlertService,
    public fileService: FileService
  ) {}

  ngOnInit(): void {
    if (this.isNew) {
      this.model = {
        id: null,
        schoolName: null,
        degree: null,
        fieldOfStudy: null,
        grade: null,
        isDefault: false,
        startYear: null,
        endYear: null,
        activityAndSociety: null,
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
      .subscribe((result: Education) => {
        if (result) {
          this.model = result;
          this.fileService.msgToTem(this.model.media)
        }
      })
  }

  onSubmit() {
    console.log("CV Edu submit form:", this.model);
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
