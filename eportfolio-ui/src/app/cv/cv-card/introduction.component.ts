import { Component, Input } from '@angular/core';

@Component({
    selector: 'card-introduction',
    template: './introduction.component.html',
    styleUrls: ['../cv.component.css']
})

export class IntroductionComponent {

    @Input() title: string;
    @Input() data: Object;

    addForm() {
        console.log("good")
    }
    editForm() {
        console.log("good")
    }

}
