import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { BlogRemoteService } from './blog-remote.service';

describe('BlogRemote Service', () => {
  beforeEachProviders(() => [BlogRemoteService]);

  it('should ...',
      inject([BlogRemoteService], (service: BlogRemoteService) => {
    expect(service).toBeTruthy();
  }));
});
