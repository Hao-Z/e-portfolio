import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVolunteerExperienceComponent } from './modal-volunteer-experience.component';

describe('ModalVolunteerExperienceComponent', () => {
  let component: ModalVolunteerExperienceComponent;
  let fixture: ComponentFixture<ModalVolunteerExperienceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalVolunteerExperienceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalVolunteerExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
