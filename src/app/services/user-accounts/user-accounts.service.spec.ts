import { TestBed, inject } from '@angular/core/testing';

import { UserAccountDTOService } from './user-accounts.service';

describe('UserAccountDTOService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserAccountDTOService]
    });
  });

  it('should be created', inject([UserAccountDTOService], (service: UserAccountDTOService) => {
    expect(service).toBeTruthy();
  }));
});
