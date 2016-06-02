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
import { MenuComponent } from './menu.component';

describe('Component: Menu', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [MenuComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([MenuComponent],
      (component: MenuComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(MenuComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(MenuComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));

  it('should have a non-empty list of items', inject([MenuComponent],
      (component: MenuComponent) => {
    expect(component.items.length > 0).toBe(true);
    expect(Object.keys(component.items[0])).toEqual(['title', 'route', 'id', 'iconClass']);
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-menu></app-menu>
  `,
  directives: [MenuComponent]
})
class MenuComponentTestController {
}

