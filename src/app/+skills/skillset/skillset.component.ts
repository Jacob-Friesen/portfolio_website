import { Component, Input } from '@angular/core';
import { CollapseManagerService } from '../../collapse-manager.service';

@Component({
  selector: 'skill-set',
  templateUrl: 'skillset.component.html',
  providers: [CollapseManagerService]
})
export class SkillsetComponent {
  @Input() data: Object;

  constructor (public collapseManager: CollapseManagerService) {}
}
