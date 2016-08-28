import { addProviders, inject, ComponentFixture, TestComponentBuilder } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DemosComponent } from './demos.component';
import { CollapseManagerService } from '../collapse-manager.service';

describe('Component: Demos', () => {
  let builder: TestComponentBuilder;

  beforeEach(() => {
    addProviders([
      CollapseManagerService,
      DemosComponent
    ]);
  });

  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([DemosComponent],
      (component: DemosComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(DemosComponentTestComponent)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(DemosComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'app-demos-test',
  template: `
    <app-demos></app-demos>
  `,
  directives: [DemosComponent]
})
class DemosComponentTestComponent {
}

