import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { Skill } from 'src/app/core/models/skill.model';
import { ApiService } from 'src/app/core/services/api.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { userID } from 'src/global';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-modal-skill',
  templateUrl: '../modal.component.html',
  styleUrls: ['./modal-skill.component.css']
})
export class ModalSkillComponent implements OnInit {

  title: string = `Skill`;
  classname: string = `skill`;
  isNew: boolean = true;

  model: Skill;
  form = new FormGroup({});
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'skillName',
      type: 'input',
      templateOptions: {
        label: 'Skill Name',
        maxLength: 255,
        required: true
      }
    }
  ]

  constructor(
    public modal: NgbActiveModal,
    private apiService: ApiService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    if (this.isNew) {
      this.model = {
        id: null,
        skillName: null,
      }
    }
  }

  onSubmit() {
    console.log("CV skill submit form:", this.model);
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
