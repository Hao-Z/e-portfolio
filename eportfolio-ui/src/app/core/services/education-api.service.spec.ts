import { TestBed } from '@angular/core/testing';

import { EducationApiService } from './education-api.service';

describe('EducationApiService', () => {
  let service: EducationApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EducationApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
