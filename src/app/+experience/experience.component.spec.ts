import { addProviders, inject, ComponentFixture, TestComponentBuilder } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ExperienceComponent } from './experience.component';
import { CollapseManagerService } from '../collapse-manager.service';

describe('Component: Experience', () => {
  let builder: TestComponentBuilder;

  beforeEach(() => {
    addProviders([
      CollapseManagerService,
      ExperienceComponent
    ]);
  });

  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([ExperienceComponent],
      (component: ExperienceComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(ExperienceComponentTestComponent)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(ExperienceComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'app-experience-test',
  template: `
    <app-experience></app-experience>
  `,
  directives: [ExperienceComponent]
})
class ExperienceComponentTestComponent {
}

