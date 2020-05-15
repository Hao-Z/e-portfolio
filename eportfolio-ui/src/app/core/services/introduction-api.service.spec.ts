import { TestBed } from '@angular/core/testing';

import { IntroductionApiService } from './introduction-api.service';

describe('IntroductionApiService', () => {
  let service: IntroductionApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntroductionApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
