import { TestBed, inject } from '@angular/core/testing';

import { PersonDetailResolver } from './person-detail-resolver.service';

describe('PersonDetailResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PersonDetailResolver]
    });
  });

  it('should be created', inject([PersonDetailResolver], (service: PersonDetailResolver) => {
    expect(service).toBeTruthy();
  }));
});
