import { TestBed } from '@angular/core/testing';

import { RoomSearchService } from './room-search.service';

describe('RoomSearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoomSearchService = TestBed.get(RoomSearchService);
    expect(service).toBeTruthy();
  });
});
