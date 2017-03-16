import { Component, Input } from '@angular/core';

@Component({
  selector: 'light-box',
  templateUrl: 'lightbox.component.html'
})
export class LightboxComponent {
  @Input() image: string;

  modalLoadingMessageId: string;
  modalImageId: string;

  constructor() {}

  /**
   * Opens a Lighbox style modal with the large version of the sent in image. The modal is based on the Tingle modal
   * which can be found here: http://robinparisi.github.io/tingle/
   *
   * @param {string} image The image to base the full size image load on. The full size images will have .large.<type>
   */
  onImageClick(image) {
    const largeImage = image.replace('.png', '.large.png').replace('.jpg', '.large.jpg');

    this.modalImageId = 'modal-image';
    this.modalLoadingMessageId = 'loading-message';

    let modal = new window['tingle'].modal({
      footer: false,
      stickyFooter: false,
      cssClass: ['image-lightbox'],
      onOpen: () => {
        modal.resize();
        document.getElementById(this.modalImageId).className += ' loaded';
        document.getElementById(this.modalLoadingMessageId).style.display = 'none';
      }
    });

    modal.setContent(`
      <h1 id="${this.modalLoadingMessageId}" class="loading-message">Loading...</h1>
      <img id="${this.modalImageId}" src="${largeImage}"></img>
    `);
    modal.open();
  }
}
