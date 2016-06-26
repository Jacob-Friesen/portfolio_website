import { Component } from '@angular/core';
import { CollapseManagerService } from '../collapse-manager.service';
import { SkillsetComponent } from './skillset';

@Component({
  moduleId: module.id,
  selector: 'app-skills',
  templateUrl: 'skills.component.html',
  directives: [SkillsetComponent],
  providers: [CollapseManagerService]
})
export class SkillsComponent {
  constructor (public collapseManager: CollapseManagerService) {}
}
