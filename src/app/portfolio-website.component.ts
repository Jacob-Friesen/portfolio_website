import { Component } from '@angular/core';
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
  styleUrls: ['portfolio-website.component.css'],
  directives: [ROUTER_DIRECTIVES, MenuComponent],
  providers: [ROUTER_PROVIDERS]
})
@Routes([
  {path: '/home', component: HomeComponent},
  {path: '/experience', component: ExperienceComponent},
  {path: '/skills', component: SkillsComponent},
  {path: '/demos', component: DemosComponent},
  {path: '/blog', component: BlogComponent},
  {path: '/resume', component: ResumeComponent}
])
export class PortfolioWebsiteAppComponent {
  title = 'Portfolio Website!';
}
