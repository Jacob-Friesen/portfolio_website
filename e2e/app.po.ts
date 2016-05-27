export class TopSection {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('portfolio-website-app h1')).getText();
  }
}

export class Page {
  title = element(by.id('title'));
  menuId = null;

  /**
   * Goes to the page specified in menuId for the inherited page.
   *
   * @returns {object} This Page Object.
   */
  navigateTo() {
    if (this.menuId === null) {
      throw('The inherited page must specify a menuId');
    }
    element(by.id(this.menuId)).click();


    return this;
  }
}

// Until the pages are built out these will all be in one file.

export class HomePage extends Page {
  menuId = 'home-menu-item';
}

export class ExperiencePage extends Page {
  menuId = 'experience-menu-item';
}