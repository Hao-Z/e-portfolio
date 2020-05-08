import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSkillComponent } from './modal-skill.component';

describe('ModalSkillComponent', () => {
  let component: ModalSkillComponent;
  let fixture: ComponentFixture<ModalSkillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSkillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
