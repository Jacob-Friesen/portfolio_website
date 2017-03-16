import { Component } from '@angular/core';
import { CollapseManagerService } from '../collapse-manager.service';

@Component({
  selector: 'app-demos',
  templateUrl: 'demos.component.html',
  providers: [CollapseManagerService]
})
export class DemosComponent {
  constructor (public collapseManager: CollapseManagerService) {}
}
