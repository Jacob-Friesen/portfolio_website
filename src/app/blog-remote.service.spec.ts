import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { provide } from '@angular/core';
import { JSONPBackend, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BlogRemoteService } from './blog-remote.service';
import { JSONP_PROVIDERS } from '@angular/http';
import 'rxjs/Rx';

describe('BlogRemote Service', () => {
  beforeEachProviders(() => [
    JSONP_PROVIDERS,
    provide(JSONPBackend, {useClass: MockBackend}),
    BlogRemoteService
  ]);

  describe('getPosts', function() {
    it('should return a promise that gets all the posts then takes the first one',
      inject([JSONPBackend, BlogRemoteService], (mock: MockBackend, service: BlogRemoteService) => {

      mock.connections.subscribe((connection: MockConnection) => {
        connection.mockRespond(new Response(
          new ResponseOptions({
            body: {
              posts: [{ first: 'post' }, { second: 'post' }]
            }
          })
        ));
      });

      service.getPost().subscribe((res) => {
        expect(res).toEqual({ first: 'post' });
      });
    }));
  });
});
