import { Component, OnInit } from '@angular/core';
import { CollapseManagerService } from '../collapse-manager.service';

@Component({
  moduleId: module.id,
  selector: 'app-demos',
  templateUrl: 'demos.component.html',
  styleUrls: ['demos.component.css'],
  providers: [CollapseManagerService]
})
export class DemosComponent implements OnInit {

  constructor (public collapseManager: CollapseManagerService) {}

  ngOnInit() {
  }

}
