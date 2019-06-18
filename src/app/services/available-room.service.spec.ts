import { TestBed } from '@angular/core/testing';

import { AvailableRoomService } from './available-room.service';

describe('AvailableRoomService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AvailableRoomService = TestBed.get(AvailableRoomService);
    expect(service).toBeTruthy();
  });
});
