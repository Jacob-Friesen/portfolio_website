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

  onImageClick(image) {
    const modalImage = 'modal-image';
    const modalLoadingMessage = 'loading-message';
    const largeImage = image.replace('.png', '.large.png').replace('.jpg', '.large.jpg');

    var modal = new window['tingle'].modal({
      footer: false,
      stickyFooter: false,
      cssClass: ['image-lightbox'],
      onOpen: function() {
        modal.resize();
        document.getElementById(modalImage).className += ' loaded';
        document.getElementById(modalLoadingMessage).style.display = 'none';
      }
    });

    modal.setContent(`
      <h1 id="${modalLoadingMessage}" class="loading-message">Loading...</h1>
      <img id="${modalImage}" src="${largeImage}"></img>`
    );
    modal.open();
  }
}
