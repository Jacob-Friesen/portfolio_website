import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LightboxComponent } from './lightbox.component';

describe('Component: Lightbox', () => {
  let fixture,
    component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        LightboxComponent
      ],
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(LightboxComponent);
    component = fixture.debugElement.componentInstance;
  });

  // sanity check
  it('should create the component', () => {
    expect(component).toBeTruthy();
    const node = fixture.debugElement.query(By.all());
    expect(node.name).toEqual('img');
  });

  describe('onImageClick', function() {
    let modal;
    beforeEach(() => {
      modal = {
        setContent: jasmine.createSpy('setContent'),
        open: jasmine.createSpy('open'),
        resize: jasmine.createSpy('resize')
      };
      window['tingle'] = {
        modal: jasmine.createSpy('modal').and.returnValue(modal)
      };
    });

    it('should create a template with the large image and related using the passed in image as a jpg', () => {
      component.onImageClick('images/test.jpg');

      expect(modal.open).toHaveBeenCalled();
      expect(modal.setContent.calls.argsFor(0)[0].indexOf('images/test.large.jpg') > 0).toEqual(true);
    });

    it('should open the modal with the right parameters', () => {
      component.onImageClick('images/test.png');

      expect(window['tingle'].modal).toHaveBeenCalledWith({
        footer: false,
        stickyFooter: false,
        cssClass: ['image-lightbox'],
        onOpen: jasmine.any(Function)
      });
    });

    describe('onOpen', () => {
      let onOpen,
          modalImage,
          modalLoadingMessage;
      beforeEach(() => {
        component.onImageClick('images/test.png');
        onOpen = window['tingle'].modal.calls.argsFor(0)[0].onOpen;

        modalImage = { className: 'picture' };
        modalLoadingMessage = {
          style: { display: 'block' }
        };

        document.getElementById = jasmine.createSpy('create').and.callFake((id) => {
          if (id === component.modalImageId) {
            return modalImage;
          } else if (id === component.modalLoadingMessageId) {
            return modalLoadingMessage;
          }
        });
      });

      it('should resize the modal', () => {
        onOpen();

        expect(modal.resize).toHaveBeenCalled();
      });

      it('should show the image and hide the loading message', () => {
        onOpen();

        expect(modalImage.className).toEqual('picture loaded');
        expect(modalLoadingMessage.style.display).toEqual('none');
      });
    });
  });
});
