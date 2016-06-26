import { Component } from '@angular/core';
import { CollapseManagerService } from '../../collapse-manager.service';

@Component({
  moduleId: module.id,
  selector: 'skillset',
  inputs: ['data'],
  templateUrl: 'skillset.component.html',
  providers: [CollapseManagerService]
})
export class SkillsetComponent {
  public data: Object;

  constructor (public collapseManager: CollapseManagerService) {}
}
