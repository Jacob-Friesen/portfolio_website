import { addProviders, inject, TestComponentBuilder } from '@angular/core/testing';
import { Component } from '@angular/core';
import { ResumeComponent } from './resume.component';
import { Router } from '@angular/router';

describe('Component: Resume', () => {
  let builder: TestComponentBuilder;
  let component: ResumeComponent;
  let router: Router;

  beforeAll(() => {
    router = jasmine.createSpyObj('Router', ['navigateByUrl']);
    component = new ResumeComponent(router);
  });

  beforeEach(() => {
    addProviders([ResumeComponent]);
  });

  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  // Sanity check.
  it('should inject the component', () => {
    expect(component).toBeTruthy();
  });

  describe('navigateParent', function() {
    beforeEach(() => {
      spyOn(component, 'setWindowLocation');
    });

    it('should set the window location to the sent in path when it does not start with "/"', () => {
      component.navigateParent('http://jacobfriesen.com');
      expect(component.setWindowLocation).toHaveBeenCalledWith('http://jacobfriesen.com');

      component.navigateParent('file:///test.txt');
      expect(component.setWindowLocation).toHaveBeenCalledWith('file:///test.txt');
    });

    it('should navigateByUrl when it starts with "/"', () => {
      component.navigateParent('/test');
      expect(router.navigateByUrl).toHaveBeenCalledWith('/test');

      component.navigateParent('/home');
      expect(router.navigateByUrl).toHaveBeenCalledWith('/home');
    });
  });
});

@Component({
  selector: 'app-resume-test',
  template: `
    <app-resume></app-resume>
  `,
  directives: [ResumeComponent]
})
class ResumeComponentTestComponent {
}

