import { Component, Input } from '@angular/core';
import { ModalService } from 'src/app/core/services/modal.service';
import { ApiService } from 'src/app/core/services/api.service';
import { userID } from 'src/global';
import { AlertService } from 'src/app/core/services/alert.service';
import { Feature } from 'src/app/core/models/feature.model';
import { FileService } from 'src/app/core/services/file.service';

@Component({
    selector: 'card-feature',
    templateUrl: './feature.component.html',
    styleUrls: ['../cv.component.css']
})

export class FeatureComponent {

    constructor(
        public modalService: ModalService,
        private apiService: ApiService,
        private alertService: AlertService,
        public fileService: FileService
    ) { }

    @Input() classname: string
    @Input() title: string;
    @Input() data: Feature[];

    editForm(item: Feature) {
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

    clickURL(url: string) {
        if (!url.startsWith("http")) {
            url = "http://" + url
        }
        window.open(url,"_blank")
    }
    
}
