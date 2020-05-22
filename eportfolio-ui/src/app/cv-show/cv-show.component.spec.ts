import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CvShowComponent } from './cv-show.component';

describe('CvShowComponent', () => {
  let component: CvShowComponent;
  let fixture: ComponentFixture<CvShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CvShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CvShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
