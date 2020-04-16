import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CVsComponent } from './cvs.component';

describe('CVsComponent', () => {
  let component: CVsComponent;
  let fixture: ComponentFixture<CVsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CVsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CVsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
