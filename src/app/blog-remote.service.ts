import { Injectable } from '@angular/core';
import { Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class BlogRemoteService {
  constructor (private jsonp: Jsonp) {}

  /**
   * Extra the first post from the list of posts returned.
   * 
   * @returns {Observable} path The promise to get the post data.
   */
  getPosts(): Observable<any> {
    var url = 'http://obscurejavascript.tumblr.com/api/read/json?callback=JSONP_CALLBACK';
    return this.jsonp.request(url).map(res => res.json().posts[0]);
  }
}
