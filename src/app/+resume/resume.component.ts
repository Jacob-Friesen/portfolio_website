import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-resume',
  templateUrl: 'resume.component.html'
})
export class ResumeComponent {
  constructor(private router: Router) {}

  // Not optimal, but there is no good solution with rc1 for $window like mocking.
  setWindowLocation(url: string) {
    window.location.href = url;
  }

  /**
   * If the link is in page, trigger a main route. Otherwise change the page like a normal link.
   * 
   * @param {string} path The partial or full URL to go to. e.g.2 '/home' e.g.1 'http://jacobfriesen.com'
   */
  navigateParent(path: string) {
    if (path[0] !== '/') {
      this.setWindowLocation(path);
    } else {
      this.router.navigateByUrl(path);
    }
  }
}
