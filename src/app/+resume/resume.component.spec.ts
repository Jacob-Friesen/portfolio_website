import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ResumeComponent } from './resume.component';
import { Router } from '@angular/router';

class MockRouter { navigateByUrl() {} }

describe('Component: Resume', () => {
  let fixture,
    component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useClass: MockRouter }
      ],
      declarations: [
        ResumeComponent
      ],
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeComponent);
    component = fixture.debugElement.componentInstance;
  });

  // sanity check
  it('should create the component', () => {
    expect(component).toBeTruthy();
    const node = fixture.debugElement.query(By.all());
    expect(node.nativeElement.innerHTML).not.toEqual('');
  });

  describe('navigateParent', function() {
    beforeEach(() => {
      spyOn(component, 'setWindowLocation');
      spyOn(component.router, 'navigateByUrl');
    });

    it('should set the window location to the sent in path when it does not start with "/"', () => {
      component.navigateParent('http://jacobfriesen.com');
      expect(component.setWindowLocation).toHaveBeenCalledWith('http://jacobfriesen.com');

      component.navigateParent('file:///test.txt');
      expect(component.setWindowLocation).toHaveBeenCalledWith('file:///test.txt');
    });

    it('should navigateByUrl when it starts with "/"', () => {
      component.navigateParent('/test');
      expect(component.router.navigateByUrl).toHaveBeenCalledWith('/test');

      component.navigateParent('/home');
      expect(component.router.navigateByUrl).toHaveBeenCalledWith('/home');
    });
  });
});
