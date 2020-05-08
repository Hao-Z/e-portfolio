import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalWorkExperienceComponent } from './modal-work-experience.component';

describe('ModalWorkExperienceComponent', () => {
  let component: ModalWorkExperienceComponent;
  let fixture: ComponentFixture<ModalWorkExperienceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalWorkExperienceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalWorkExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
