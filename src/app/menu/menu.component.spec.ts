import { TestBed } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import { By } from '@angular/platform-browser';
import { MenuComponent } from './menu.component';
// import { routes } from '../app.routes';

class MockRouter { createUrlTree() {} }

describe('Component: Menu', () => {
  let fixture,
    component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([])
      ],
      providers: [
        { provide: Router, useClass: MockRouter }
      ],
      declarations: [
        MenuComponent
      ],
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.debugElement.componentInstance;
  });

  // sanity check
  it('should create the component', () => {
    expect(component).toBeTruthy();
    const node = fixture.debugElement.query(By.all());
    expect(node.nativeElement.innerHTML).not.toEqual('');
  });

  it('should have a non-empty list of items', () => {
    expect(component.items.length > 0).toBe(true);
    expect(Object.keys(component.items[0])).toEqual(['title', 'route', 'id', 'iconClass']);
  });

  describe('initialize Menu', function() {
    it('should set to non mobile and open the menu when in desktop', () => {
      spyOn(component, 'getWindowSize').and.returnValue({ width: 651, height: 500 });

      component.initializeMobile();

      expect(component.isMobile).toEqual(false);
      expect(component.menuOpen).toEqual(true);
    });

    it('should set to non mobile and open the menu when in desktop', () => {
      spyOn(component, 'getWindowSize').and.returnValue({ width: 650, height: 500 });

      component.initializeMobile();

      expect(component.isMobile).toEqual(true);
      expect(component.menuOpen).toEqual(false);
    });
  });

  describe('toggleMenu', function() {
    it('should invert menuOpen', () => {
      component.menuOpen = false;
      component.toggleMenu();

      expect(component.menuOpen).toEqual(true);

      component.toggleMenu();

      expect(component.menuOpen).toEqual(false);
    });
  });

  describe('closeMenu', function() {
    it('should set the menu to closed', () => {
      component.closeMenu();

      expect(component.menuOpen).toEqual(false);
    });
  });

  describe('openMenu', function() {
    it('should set the menu to closed', () => {
      component.openMenu();

      expect(component.menuOpen).toEqual(true);
    });
  });
});
