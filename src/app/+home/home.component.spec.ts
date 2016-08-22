import { addProviders, inject, ComponentFixture, TestComponentBuilder } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HomeComponent } from './home.component';

describe('Component: Home', () => {
  let builder: TestComponentBuilder;

  beforeEach(() => {
    addProviders([HomeComponent]);
  });

  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([HomeComponent],
      (component: HomeComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(HomeComponentTestComponent)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(HomeComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'app-home-test',
  template: `
    <app-home></app-home>
  `,
  directives: [HomeComponent]
})
class HomeComponentTestComponent {
}

