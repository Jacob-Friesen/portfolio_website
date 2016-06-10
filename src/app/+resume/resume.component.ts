import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-resume',
  templateUrl: 'resume.component.html',
  styleUrls: ['resume.component.css']
})
export class ResumeComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
  }

  /**
   * If the link is in page, trigger a main route. Otherwise change the page like a normal link.
   * 
   * @param {string} path The partial or full URL to go to. e.g.2 '/home' e.g.1 'http://jacobfriesen.com'
   */
  navigateParent(path) {
    if (path[0] !== '/') {
      window.location = path;
    } else {
      this.router.navigateByUrl(path);
    }
  }
}
