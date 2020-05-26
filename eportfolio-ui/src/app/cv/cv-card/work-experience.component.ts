import { Component, Input } from '@angular/core';
import { WorkExperience } from 'src/app/core/models/work-experience.model';
import { ModalService } from 'src/app/core/services/modal.service';
import { ApiService } from 'src/app/core/services/api.service';
import { userID } from 'src/global';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
    selector: 'card-we',
    templateUrl: './work-experience.component.html',
    styleUrls: ['../cv.component.css']
})

export class WorkExperienceComponent {

    constructor(
        public modalService: ModalService,
        private apiService: ApiService,
        private alertService: AlertService
    ) { }

    @Input() classname: string
    @Input() title: string;
    @Input() data: WorkExperience[];

    editForm(item: WorkExperience) {
        this.modalService.openModal(this.classname, false, item)
    }

    addForm() {
        this.modalService.openModal(this.classname, true)
    }

    deleteForm(object_id: string) {
        this.apiService.delete(userID, this.classname, object_id)
          .subscribe(() => {
            this.alertService.success("Successfully deleted!");
          })
    }
}
