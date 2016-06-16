import { Component, OnInit } from '@angular/core';
import { BlogRemoteService } from '../blog-remote.service';

@Component({
  moduleId: module.id,
  selector: 'app-blog',
  templateUrl: 'blog.component.html',
  styleUrls: ['blog.component.css'],
  providers: [BlogRemoteService]
})
export class BlogComponent implements OnInit {

  postTitle: string;
  postBody: string;

  constructor (public blogRemote: BlogRemoteService) {}

  ngOnInit() {
    this.postTitle = 'Loading Blog...';
    this.postBody = 'Blog Body Loading...';
    this.getBlogPost();
  }

  /**
   * Loads the posts remotely, then if successful adds them to the page. Errors are just handled by a console.log for
   * now.
   */
  getBlogPost() {
    this.blogRemote.getPost()
                   .subscribe(this.loadPost.bind(this),
                     error => console.log('ERROR:', error)
                   );
  }

  /**
   * Loads the passed in post data into the page (via bindings).
   * 
   * @param {object} post Contains all the post data retrieved from Tumblr. The only relevant fields are 'regular-title'
   *                      and 'regular-body'.
   */
  loadPost(post) {
    this.postTitle = post['regular-title'];
    this.postBody = post['regular-body'];
  }

}
