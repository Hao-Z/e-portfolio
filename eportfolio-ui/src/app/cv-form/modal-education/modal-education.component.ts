import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Education } from '../../core/models/education.model';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-education',
  templateUrl: './modal-education.component.html',
  styleUrls: ['./modal-education.component.css']
})
export class ModalEducationComponent implements OnInit {

  title: string = `Education`;

  form = new FormGroup({});
  options: FormlyFormOptions = {};
  model: Education;
  fields: FormlyFieldConfig[] = [
    {
      key: 'schoolName',
      type: 'input',
      templateOptions: {
        label: 'School Name'
      }
    },
    {
      key: 'degree',
      type: 'input',
      templateOptions: {
        label: 'Degree',
      }
    },
    {
      key: 'fieldOfStudy',
      type: 'input',
      templateOptions: {
        label: 'Study Field',
      }
    },
    {
      key: 'grade',
      type: 'input',
      templateOptions: {
        label: 'Grade',
      }
    },
    {
      key: 'startYear',
      type: 'input',
      templateOptions: {
        type: 'date',
        label: 'Start Year',
      }
    },
    {
      key: 'endYear',
      type: 'datepicker',
      templateOptions: {
        label: 'End Year',
      }
    },
    {
      key: 'activitiesAndSocieties',
      type: 'input',
      templateOptions: {
        label: 'Activities And Societies',
      }
    },
    {
      key: 'description',
      type: 'textarea',
      templateOptions: {
        label: 'Description',
      }
    },
    {
      key: 'media',
      type: 'input',
      templateOptions: {
        type: 'file',
        label: 'Media',
      }
    },
  ];
  constructor( public modal: NgbActiveModal ) { }

  ngOnInit(): void {
    this.model = {
      schoolName: null,
      degree: null,
      fieldOfStudy: null,
      grade: null,
      startYear: null,
      endYear: null,
      activitiesAndSocieties: null,
      description: null,
      media: null,
    }
    console.log(this.model)
  }

  onSubmit() {
    console.log(this.model)
  }

}
