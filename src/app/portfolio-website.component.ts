import { Component } from '@angular/core';
import { HomeComponent } from './+home';
import { Routes , ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router';
import { ExperienceComponent } from './+experience';

@Component({
  moduleId: module.id,
  selector: 'portfolio-website-app',
  templateUrl: 'portfolio-website.component.html',
  styleUrls: ['portfolio-website.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [ROUTER_PROVIDERS]
})
@Routes([
  {path: '/home', component: HomeComponent},
  {path: '/experience', component: ExperienceComponent}
])
export class PortfolioWebsiteAppComponent {
  title = 'Portfolio Website!';
}
