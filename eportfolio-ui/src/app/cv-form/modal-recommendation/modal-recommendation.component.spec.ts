import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRecommendationComponent } from './modal-recommendation.component';

describe('ModalRecommendationComponent', () => {
  let component: ModalRecommendationComponent;
  let fixture: ComponentFixture<ModalRecommendationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalRecommendationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRecommendationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
