import { Component, OnInit } from '@angular/core';
import { BlogRemoteService } from '../blog-remote.service';

@Component({
  selector: 'app-blog',
  templateUrl: 'blog.component.html',
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

    // The defer will cause the pretty print to execute after all libraries like angular do synchronous operations.
    setTimeout(this.setupPrettyPrint);
  }

  /**
   * Pretty print only applies on pre elements with '.prettyprint'. Since the blog should not have to compensate for
   * this website, then this website will have to auto add the classes to all pre tags. Then apply the pretty print.
   */
  setupPrettyPrint() {
    const preTags = document.getElementsByTagName('pre');
    if (preTags) {
      for (let i = 0; i <= preTags.length; i += 1) {
        if (preTags[i]) {
          preTags[i].className += ' prettyprint';
        }
      }
    }

    // <object>['<name>'] Bypasses the TypeScript property checker.
    window['PR'].prettyPrint();
  }
}
