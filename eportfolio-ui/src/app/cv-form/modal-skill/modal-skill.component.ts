import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { Skill } from 'src/app/core/models/skill.model';
import { ApiService } from 'src/app/core/services/api.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { userID } from 'src/global';

@Component({
  selector: 'app-modal-skill',
  templateUrl: '../modal.component.html',
  styleUrls: ['./modal-skill.component.css']
})
export class ModalSkillComponent implements OnInit {

  title: string = `Skill`;

  form = new FormGroup({});
  options: FormlyFormOptions = {};
  model: Skill;
  fields: FormlyFieldConfig[] = [
    {
      key: 'skillName',
      type: 'input',
      templateOptions: {
        label: 'Skill Name',
      }
    }
  ]

  constructor(
    public modal: NgbActiveModal,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.model = {
      skillName: null,
    }
  }

  onSubmit() {
    console.log("CV skill submit form:", this.model);
		if (this.form.valid) {
      this.apiService.create(userID, this.model, this.title.toLowerCase())
        .subscribe((result: Skill) => {
          console.log("CV skill create response:", JSON.stringify(result))
        })
    }
  }

}
