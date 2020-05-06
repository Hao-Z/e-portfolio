import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalIntroductionComponent } from './modal-introduction.component';

describe('ModalIntroductionComponent', () => {
  let component: ModalIntroductionComponent;
  let fixture: ComponentFixture<ModalIntroductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalIntroductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalIntroductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
