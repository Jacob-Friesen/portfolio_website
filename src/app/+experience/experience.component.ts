import { Component } from '@angular/core';
import { CollapseManagerService } from '../collapse-manager.service';

@Component({
  selector: 'app-experience',
  templateUrl: 'experience.component.html',
  providers: [CollapseManagerService]
})
export class ExperienceComponent {
  constructor (public collapseManager: CollapseManagerService) {}
}
