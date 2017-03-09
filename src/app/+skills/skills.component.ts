import { Component } from '@angular/core';
import { CollapseManagerService } from '../collapse-manager.service';

@Component({
  selector: 'app-skills',
  templateUrl: 'skills.component.html',
  providers: [CollapseManagerService]
})
export class SkillsComponent {
  constructor (public collapseManager: CollapseManagerService) {}
}
