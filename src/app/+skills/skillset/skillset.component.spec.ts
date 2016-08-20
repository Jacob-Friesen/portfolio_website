import {
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  it,
  inject,
} from '@angular/core/testing';
import { ComponentFixture, TestComponentBuilder } from '@angular/compiler/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SkillsetComponent } from './skillset.component';
import { CollapseManagerService } from '../../collapse-manager.service';

describe('Component: Skillset', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [CollapseManagerService, SkillsetComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([SkillsetComponent],
      (component: SkillsetComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(SkillsetComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(SkillsetComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <skill-set></skill-set>
  `,
  directives: [SkillsetComponent]
})
class SkillsetComponentTestController {
}

