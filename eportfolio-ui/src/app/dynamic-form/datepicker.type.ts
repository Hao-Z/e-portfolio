import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { NgbDateParserFormatter, NgbDateAdapter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateFRParserFormatter, CustomAdapter } from './ngb-date-custom';

@Component({
 selector: 'formly-datepicker',
 template: `
    <div class="input-group">
        <input class="form-control"
        [minDate]="dateBefore"
        [maxDate]="dateAfter"
        [placeholder]="to.label"
        [formControl]="formControl"
        [formlyAttributes]="field"
        ngbDatepicker #d="ngbDatepicker">
        <div class="input-group-append">
            <button class="btn btn-outline-secondary calendar" (click)="d.toggle()" type="button"></button>
        </div>
    </div>
 `,
 providers: [
     { provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter },
     { provide: NgbDateAdapter, useClass: CustomAdapter }
    ]
})
export class FormlyDatepickerFieldType extends FieldType {
    dateBefore: NgbDateStruct = { year: 1800, month: 1, day: 1 }
    dateAfter: NgbDateStruct = { year: 3000, month: 1, day: 1 }
}