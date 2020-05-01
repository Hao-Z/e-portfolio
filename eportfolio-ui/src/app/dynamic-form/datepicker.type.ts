import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
 
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
            <i class="fa fa-calendar"></i>
        </div>
    </div>
 `,
})
export class FormlyDatepickerFieldType extends FieldType {}