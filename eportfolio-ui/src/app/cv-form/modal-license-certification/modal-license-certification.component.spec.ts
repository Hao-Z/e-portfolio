import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLicenseCertificationComponent } from './modal-license-certification.component';

describe('ModalLicenseCertificationComponent', () => {
  let component: ModalLicenseCertificationComponent;
  let fixture: ComponentFixture<ModalLicenseCertificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalLicenseCertificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalLicenseCertificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
