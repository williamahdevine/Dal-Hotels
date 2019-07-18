import { TestBed } from '@angular/core/testing';

import { BookingRecordService } from './booking-record.service';

describe('BookingRecordService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BookingRecordService = TestBed.get(BookingRecordService);
    expect(service).toBeTruthy();
  });
});
