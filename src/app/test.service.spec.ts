import { TestBed } from '@angular/core/testing';

import { TestService } from './test.service';

describe('TestService', () => {
  let service: TestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have add',()=>{
    expect(service.add).toBeTruthy();
  })

  it('should add values',()=>{
    expect(service.add(2,3)).toBe(5);
  });


});
