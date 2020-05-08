import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFeatureComponent } from './modal-feature.component';

describe('ModalFeatureComponent', () => {
  let component: ModalFeatureComponent;
  let fixture: ComponentFixture<ModalFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalFeatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
