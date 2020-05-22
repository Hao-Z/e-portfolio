import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { NgbDateParserFormatter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateFRParserFormatter, CustomAdapter } from './ngb-date-custom';
 
@Component({
 selector: 'formly-datepicker',
 template: `
    <div class="input-group">
        <input class="form-control"
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
export class FormlyDatepickerFieldType extends FieldType {}