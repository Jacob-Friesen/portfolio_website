import { addProviders, inject } from '@angular/core/testing';
import { AppComponent } from '../app/app.component';

beforeEach(() => {
  addProviders([AppComponent]);
});

describe('App (Base)', () => {
  it('should create the app',
      inject([AppComponent], (app: AppComponent) => {
    expect(app).toBeTruthy();
  }));
});
