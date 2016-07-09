import { addProviders, inject } from '@angular/core/testing';
import { PortfolioWebsiteAppComponent } from '../app/portfolio-website.component';

beforeEach(() => {
  addProviders([PortfolioWebsiteAppComponent]);
});

describe('App: PortfolioWebsite', () => {
  it('should create the app',
      inject([PortfolioWebsiteAppComponent], (app: PortfolioWebsiteAppComponent) => {
    expect(app).toBeTruthy();
  }));
});
