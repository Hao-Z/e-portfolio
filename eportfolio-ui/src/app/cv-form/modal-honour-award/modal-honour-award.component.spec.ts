import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalHonourAwardComponent } from './modal-honour-award.component';

describe('ModalHonourAwardComponent', () => {
  let component: ModalHonourAwardComponent;
  let fixture: ComponentFixture<ModalHonourAwardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalHonourAwardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalHonourAwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
