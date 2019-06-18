import { TestBed } from '@angular/core/testing';

import { AvaliableRoomServiceService } from './avaliable-room-service.service';

describe('AvaliableRoomServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AvaliableRoomServiceService = TestBed.get(AvaliableRoomServiceService);
    expect(service).toBeTruthy();
  });
});
