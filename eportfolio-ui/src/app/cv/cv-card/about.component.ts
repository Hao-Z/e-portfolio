import { Component, Input } from '@angular/core';
import { ModalService } from 'src/app/core/services/modal.service';
import { UniqueApiService } from 'src/app/core/services/unique-api.service';
import { About } from 'src/app/core/models/about.model';
import { userID } from 'src/global';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
    selector: 'card-about',
    templateUrl: './about.component.html',
    styleUrls: ['../cv.component.css']
})

export class AboutComponent {

    @Input() title: string;
    @Input() data: About;
    @Input() classname: string

    constructor(
        public modalService: ModalService,
        private apiService: UniqueApiService,
        private alertService: AlertService
    ) { }

    deleteForm() {
        var nullAbout: About = {
            summary: ""
        }
        this.apiService.update(userID, nullAbout, 'about')          
          .subscribe(() => {
            this.alertService.success("Successfully deleted!");
          })
    }
    editForm() {
        this.modalService.openModal(this.classname, false, this.data)
    }

}
