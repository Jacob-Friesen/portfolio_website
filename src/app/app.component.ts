import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  // This creates a class that causes CSS to trigger only after load after at least one page has loaded. There seems to
  // be no angular specific way to check page loads.
  ngOnInit() {
    (function check() {
      if (document.getElementsByClassName('page').length > 0) {
        setTimeout(() => document.body.className += 'initial-load-complete', 200);
      } else {
        setTimeout(check, 100);
      }
    })();
  }

  getYear() {
    return new Date().getFullYear();
  }
}
