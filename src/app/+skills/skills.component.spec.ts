import { addProviders, inject, ComponentFixture, TestComponentBuilder } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SkillsComponent } from './skills.component';
import { CollapseManagerService } from '../collapse-manager.service';

describe('Component: Skills', () => {
  let builder: TestComponentBuilder;

  beforeEach(() => {
    addProviders([
      CollapseManagerService,
      SkillsComponent
    ]);
  });

  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([SkillsComponent],
      (component: SkillsComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(SkillsComponentTestComponent)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(SkillsComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'app-skills-test',
  template: `
    <app-skills></app-skills>
  `,
  directives: [SkillsComponent]
})
class SkillsComponentTestComponent {
}

