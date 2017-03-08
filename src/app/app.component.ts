import { NgModule, Component, OnInit } from '@angular/core';
import { MenuComponent } from './menu';
// import { ROUTER_DIRECTIVES} from '@angular/router';

@NgModule({
  declarations: [ AppComponent, MenuComponent ],
  bootstrap:    [ AppComponent ]
})
@Component({
  // moduleId: module.id + '',
  selector: 'portfolio-website-app',
  templateUrl: 'app.component.html',
  // directives: [ROUTER_DIRECTIVES, MenuComponent]
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
}
