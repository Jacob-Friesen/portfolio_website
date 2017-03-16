import { TestBed, inject } from '@angular/core/testing';
import { JSONPBackend, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BlogRemoteService } from './blog-remote.service';
import { JsonpModule } from '@angular/http';
import 'rxjs/Rx';

describe('BlogRemote Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [JsonpModule],
      providers: [
        BlogRemoteService,
        { provide: JSONPBackend, useClass: MockBackend }
      ],
    });
  });
  afterEach(() => TestBed.resetTestingModule());

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
