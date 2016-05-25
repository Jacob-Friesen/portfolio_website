export class PortfolioWebsitePage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('portfolio-website-app h1')).getText();
  }
}
