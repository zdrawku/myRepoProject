import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { IGNWService } from './ignw.service';

describe('IGNWService', () => {
  let service: IGNWService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(IGNWService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
