// Custom elements when provided as a schema prevents sub component loads
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from '../app/app.component';

let fixture;

beforeEach(() => {
  // addProviders([AppComponent]);
  TestBed.configureTestingModule({
    declarations: [
      AppComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  }).compileComponents();
});
beforeEach(() => {
  fixture = TestBed.createComponent(AppComponent);
});

describe('App (Base)', () => {
  it('should create the app', () => {
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
