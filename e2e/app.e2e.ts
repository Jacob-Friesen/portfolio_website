import { PortfolioWebsitePage } from './app.po';

describe('portfolio-website App', function() {
  let page: PortfolioWebsitePage;

  beforeEach(() => {
    page = new PortfolioWebsitePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Portfolio Website!');
  });
});
