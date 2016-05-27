import { TopSection, HomePage, ExperiencePage } from './app.po';

describe('portfolio-website App', function() {
  let page: TopSection;
  let home: HomePage;
  let experience: ExperiencePage;

  beforeEach(() => {
    page = new TopSection();
    home = new HomePage();
    experience = new ExperiencePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Portfolio Website!');
    browser.sleep(100);// Better strategy for this later...
  });

  // Better seperated tests once the site is actually built.

  it('should show the home page upon navigating there', () => {
    home.navigateTo();
    expect(home.title.getText()).toEqual('Home');
  });

  it('should show the experience page upon navigating there', () => {
    experience.navigateTo();
    expect(experience.title.getText()).toEqual('experience works!');
  });
});
