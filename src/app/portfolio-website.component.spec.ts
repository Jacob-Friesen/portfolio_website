import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { PortfolioWebsiteAppComponent } from '../app/portfolio-website.component';

beforeEachProviders(() => [PortfolioWebsiteAppComponent]);

describe('App: PortfolioWebsite', () => {
  it('should create the app',
      inject([PortfolioWebsiteAppComponent], (app: PortfolioWebsiteAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'portfolio-website works!\'',
      inject([PortfolioWebsiteAppComponent], (app: PortfolioWebsiteAppComponent) => {
    expect(app.title).toEqual('portfolio-website works!');
  }));
});
