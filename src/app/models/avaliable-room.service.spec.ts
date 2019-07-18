import { TestBed } from '@angular/core/testing';

import { AvaliableRoomService } from './avaliable-room.service';

describe('AvaliableRoomService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AvaliableRoomService = TestBed.get(AvaliableRoomService);
    expect(service).toBeTruthy();
  });
});
