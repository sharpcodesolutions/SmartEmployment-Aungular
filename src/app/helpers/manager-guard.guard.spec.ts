import { TestBed } from '@angular/core/testing';

import { ManagerGuardGuard } from './manager-guard.guard';

describe('ManagerGuardGuard', () => {
  let guard: ManagerGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ManagerGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
