import { Component } from '@angular/core';
import { CollapseManagerService } from '../collapse-manager.service';
import { LightboxComponent } from '../lightbox';

@Component({
  moduleId: module.id,
  selector: 'app-demos',
  templateUrl: 'demos.component.html',
  directives: [LightboxComponent],
  providers: [CollapseManagerService]
})
export class DemosComponent {
  constructor (public collapseManager: CollapseManagerService) {}
}
