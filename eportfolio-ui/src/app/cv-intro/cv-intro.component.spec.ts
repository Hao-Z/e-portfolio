import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CvIntroComponent } from './cv-intro.component';

describe('CvIntroComponent', () => {
  let component: CvIntroComponent;
  let fixture: ComponentFixture<CvIntroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CvIntroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CvIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
