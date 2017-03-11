import { Injectable } from '@angular/core';
import { Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class BlogRemoteService {
  constructor (private jsonp: Jsonp) {}

  /**
   * Extract the first post from the list of posts returned.
   *
   * @returns {Observable} path The promise to get the post data.
   */
  getPost(): Observable<any> {
    let url = 'http://obscurejavascript.tumblr.com/api/read/json?callback=JSONP_CALLBACK';
    return this.jsonp.request(url).map(res => res.json().posts[0]);
  }
}
