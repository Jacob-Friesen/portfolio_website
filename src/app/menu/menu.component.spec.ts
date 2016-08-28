import { addProviders, inject, ComponentFixture, TestComponentBuilder } from '@angular/core/testing';
import { Component, provide } from '@angular/core';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { MenuComponent } from './menu.component';

class MockRouter { createUrlTree() {} }

describe('Component: Menu', () => {
  let builder: TestComponentBuilder;

  beforeEach(() => {
    addProviders([
      provide(Router, { useClass: MockRouter }),
      MenuComponent
    ]);
  });

  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([MenuComponent], (component: MenuComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(MenuComponentTestComponent)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(MenuComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));

  it('should have a non-empty list of items', inject([MenuComponent], (component: MenuComponent) => {
    expect(component.items.length > 0).toBe(true);
    expect(Object.keys(component.items[0])).toEqual(['title', 'route', 'id', 'iconClass']);
  }));

  describe('initialize Menu', function() {
    it('should set to non mobile and open the menu when in desktop',
    inject([MenuComponent], (component: MenuComponent) => {
      spyOn(component, 'getWindowSize').and.returnValue({ width: 651, height: 500 });

      component.initializeMobile();

      expect(component.isMobile).toEqual(false);
      expect(component.menuOpen).toEqual(true);
    }));

    it('should set to non mobile and open the menu when in desktop',
     inject([MenuComponent], (component: MenuComponent) => {
      spyOn(component, 'getWindowSize').and.returnValue({ width: 650, height: 500 });

      component.initializeMobile();

      expect(component.isMobile).toEqual(true);
      expect(component.menuOpen).toEqual(false);
    }));
  });

  describe('toggleMenu', function() {
    it('should invert menuOpen', inject([MenuComponent], (component: MenuComponent) => {
      component.menuOpen = false;
      component.toggleMenu();

      expect(component.menuOpen).toEqual(true);

      component.toggleMenu();

      expect(component.menuOpen).toEqual(false);
    }));
  });

  describe('closeMenu', function() {
    it('should set the menu to closed', inject([MenuComponent], (component: MenuComponent) => {
      component.closeMenu();

      expect(component.menuOpen).toEqual(false);
    }));
  });

  describe('openMenu', function() {
    it('should set the menu to closed', inject([MenuComponent], (component: MenuComponent) => {
      component.openMenu();

      expect(component.menuOpen).toEqual(true);
    }));
  });
});

@Component({
  selector: 'app-menu-test',
  template: `
    <app-menu></app-menu>
  `,
  directives: [MenuComponent]
})
class MenuComponentTestComponent {}
