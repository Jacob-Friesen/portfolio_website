import { addProviders, inject } from '@angular/core/testing';
import { LightboxComponent } from './lightbox.component';

describe('Component: Lightbox', () => {
  beforeEach(() => {
    addProviders([LightboxComponent]);
  });

  describe('onImageClick', function() {
    let modal;
    beforeEach(function() {
      modal = {
        setContent: jasmine.createSpy('setContent'),
        open: jasmine.createSpy('open'),
        resize: jasmine.createSpy('resize')
      };
      window['tingle'] = {
        modal: jasmine.createSpy('modal').and.returnValue(modal)
      };
    });

    it('should create a template with the large image and related using the passed in image as a jpg',
      inject([LightboxComponent], (service: LightboxComponent) => {
      service.onImageClick('images/test.jpg');

      expect(modal.open).toHaveBeenCalled();
      expect(modal.setContent.calls.argsFor(0)[0].indexOf('images/test.large.jpg') > 0).toEqual(true);
    }));

    it('should create a template with the large image and related using the passed in image as a png',
      inject([LightboxComponent], (service: LightboxComponent) => {
      service.onImageClick('images/test.png');

      expect(modal.open).toHaveBeenCalled();
      expect(modal.setContent.calls.argsFor(0)[0].indexOf('images/test.large.png') > 0).toEqual(true);
    }));

    it('should open the modal with the right parameters',
      inject([LightboxComponent], (service: LightboxComponent) => {
      service.onImageClick('images/test.png');

      expect(window['tingle'].modal).toHaveBeenCalledWith({
        footer: false,
        stickyFooter: false,
        cssClass: ['image-lightbox'],
        onOpen: jasmine.any(Function)
      });
    }));

    describe('onOpen', function() {
      let onOpen,
          modalImage,
          modalLoadingMessage;
      beforeEach(inject([LightboxComponent], (service: LightboxComponent) => {
        service.onImageClick('images/test.png');
        onOpen = window['tingle'].modal.calls.argsFor(0)[0].onOpen;

        modalImage = { className: 'picture' };
        modalLoadingMessage = {
          style: { display: 'block' }
        };

        document.getElementById = jasmine.createSpy('create').and.callFake(function(id) {
          if (id === service.modalImageId) {
            return modalImage;
          } else if (id === service.modalLoadingMessageId) {
            return modalLoadingMessage;
          }
        });
      }));

      it('should resize the modal', function() {
        onOpen();

        expect(modal.resize).toHaveBeenCalled();
      });

      it('should show the image and hide the loading message', function() {
        onOpen();

        expect(modalImage.className).toEqual('picture loaded');
        expect(modalLoadingMessage.style.display).toEqual('none');
      });
    });
  });
});
