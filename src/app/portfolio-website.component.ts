import { Component, OnInit } from '@angular/core';
import { HomeComponent } from './+home';
import { MenuComponent } from './menu';
import { Routes , ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router';
import { ExperienceComponent } from './+experience';
import { SkillsComponent } from './+skills';
import { DemosComponent } from './+demos';
import { BlogComponent } from './+blog';
import { ResumeComponent } from './+resume';

@Component({
  moduleId: module.id,
  selector: 'portfolio-website-app',
  templateUrl: 'portfolio-website.component.html',
  directives: [ROUTER_DIRECTIVES, MenuComponent],
  providers: [ROUTER_PROVIDERS]
})
@Routes([
  {path: '/home', component: HomeComponent},
  {path: '/experience', component: ExperienceComponent},
  {path: '/skills', component: SkillsComponent},
  {path: '/demos', component: DemosComponent},
  {path: '/blog', component: BlogComponent},
  {path: '/resume', component: ResumeComponent},
  {path: '*', component: HomeComponent},
  {path: '', component: HomeComponent}
])
export class PortfolioWebsiteAppComponent implements OnInit {
  title = 'Portfolio Website!';

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
