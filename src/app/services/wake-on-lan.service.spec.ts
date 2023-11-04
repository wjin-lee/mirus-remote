import { TestBed } from '@angular/core/testing';

import { WakeOnLanService } from './wake-on-lan.service';

describe('WakeOnLanService', () => {
  let service: WakeOnLanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WakeOnLanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
