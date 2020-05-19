import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { Language } from 'src/app/core/models/language.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/core/services/api.service';
import { userID } from 'src/global';

@Component({
  selector: 'app-modal-language',
  templateUrl: '../modal.component.html',
  styleUrls: ['./modal-language.component.css']
})
export class ModalLanguageComponent implements OnInit {

  title: string = `Language`;

  form = new FormGroup({});
  options: FormlyFormOptions = {};
  model: Language;
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
      type: 'input',
      templateOptions: {
        label: 'Proficiency',
      }
    }
  ]

  constructor(
    public modal: NgbActiveModal,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.model = {
      language: null,
      proficiency: null,
    }
  }

  onSubmit() {
    console.log("CV language submit form:", this.model);
		if (this.form.valid) {
      this.apiService.create(userID, this.model, this.title.toLowerCase())
        .subscribe((result: Language) => {
          console.log("CV language create response:", JSON.stringify(result))
        })
    }
  }

}
