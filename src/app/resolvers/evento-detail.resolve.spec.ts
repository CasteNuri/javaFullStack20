import { TestBed } from '@angular/core/testing';

import { EventoDetailResolve } from './evento-detail.resolve';

describe('EventoDetailResolve', () => {
  let service: EventoDetailResolve;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventoDetailResolve);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
