import { TestBed } from '@angular/core/testing';

import { CustomOptionsService } from './custom-options.service';

describe('CustomOptionsService', () => {
  let service: CustomOptionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomOptionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
