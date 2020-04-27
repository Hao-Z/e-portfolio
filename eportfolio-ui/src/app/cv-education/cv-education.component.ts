import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'
import { FormGroup, FormControl, FormArray, FormBuilder, ValidatorFn, Validators } from '@angular/forms'

@Component({
  selector: 'app-cv-education',
  templateUrl: './cv-education.component.html',
  styleUrls: ['./cv-education.component.css']
})
export class CvEducationComponent implements OnInit {

  school: any = {};

  educationForm: FormGroup;

  constructor(public fb: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.educationForm = this.fb.group({
      'schoolName': [this.school.name, Validators.required],
      'degree': [],
      'field': [],
      // 'startYear': [],
      // 'endYear': [],
      // 'grade': [],
      // 'activitiesAndSocieties': [],
      // 'Media': []
    });
  }

  onSubmit() {
    console.log(this.educationForm.value);
  }

}
