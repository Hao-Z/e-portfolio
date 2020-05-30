import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { Language } from 'src/app/core/models/language.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/core/services/api.service';
import { userID } from 'src/global';
import { AlertService } from 'src/app/core/services/alert.service';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-modal-language',
  templateUrl: '../modal.component.html',
  styleUrls: ['./modal-language.component.css']
})
export class ModalLanguageComponent implements OnInit {

  title: string = `Language`;
  classname: string = `language`;
  isNew: boolean = true;

  model: Language;
  form = new FormGroup({});
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'language',
      type: 'input',
      templateOptions: {
        label: 'Language',
        required: true
      }
    },
    {
      key: 'proficiency',
      type: 'select',
      templateOptions: {
        label: 'Proficiency',
        placeholder: "-",
        options: this.dataService.getProficiency()
      }
    }
  ]

  constructor(
    public modal: NgbActiveModal,
    private dataService: DataService,
    private apiService: ApiService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    if (this.isNew) {
      this.model = {
        id: null,
        language: null,
        proficiency: null,
      }
    }
  }

  onSubmit() {
    console.log("CV language submit form:", this.model);
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
