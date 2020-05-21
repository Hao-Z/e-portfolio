import { Component, Input } from '@angular/core';

@Component({
    selector: 'card-about',
    template: `         
        <div class="card-body" style="background-color: white">
            <button class="btn add-btn a-right" (click)="addForm()" type="button">
            <i class="fa fa-plus" aria-hidden="true"></i></button>
            <button class="btn add-btn a-right" (click)="editForm()" type="button">
            <i class="fa fa-pencil" aria-hidden="true"></i></button>
            <h4 class="card-title">{{title}}</h4>
            <hr />
            <div *ngFor="let property of data | appProperties">
                {{data[property]}}
            </div>
        </div>
        `,
    styleUrls: ['../cv.component.css']
})

export class AboutComponent {

    @Input() title: string;
    @Input() data: Object;

    addForm() {
        console.log("good")
    }
    editForm() {
        console.log("good")
    }

}
