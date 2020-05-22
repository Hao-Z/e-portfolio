import { Component, Input } from '@angular/core';
import { ModalService } from 'src/app/core/services/modal.service';
import { UniqueApiService } from 'src/app/core/services/unique-api.service';
import { About } from 'src/app/core/models/about.model';
import { userID } from 'src/global';

@Component({
    selector: 'card-about',
    template: `         
        <div class="card-body" style="background-color: white">
            <button class="btn add-btn a-right" (click)="deleteForm()" type="button">
                <i class="fa fa-trash-o" aria-hidden="true"></i></button>
            <button class="btn add-btn a-right" (click)="editForm()" type="button">
                <i class="fa fa-pencil" aria-hidden="true"></i></button>
            <h4 class="card-title">{{title}}</h4>
            <hr />
            <div *ngFor="let property of data | appProperties">
                {{data[property]}}
            </div>
        </div>
        <P></P>
        `,
    styleUrls: ['../cv.component.css']
})

export class AboutComponent {

    @Input() title: string;
    @Input() data: About;
    @Input() classname: string

    constructor(
        public modalService: ModalService,
        private apiService: UniqueApiService
    ) { }

    deleteForm() {
        var nullAbout: About = {
            summary: ""
        }
        this.apiService.update(userID, nullAbout, 'about')          
          .subscribe(result => {
            alert("Delete successfully!");
          })
    }
    editForm() {
        this.modalService.openModal(this.classname, this.data, false)
    }

}
