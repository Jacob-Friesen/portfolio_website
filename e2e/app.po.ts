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
  pageElement = null;

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
    browser.wait(protractor.ExpectedConditions.presenceOf(this.pageElement), 5000);

    return this;
  }
}

// Until the pages are built out these will all be in one file.

export class HomePage extends Page {
  menuId = 'home-menu-item';
  pageElement = element(by.css('.page.home'));
  profileImage = element(by.id('profile-image'));
}

export class CollapsiblePage extends Page {
  currentDescription = element(by.id('card-description'));
  headers = element.all(by.css('.card-header'));

  /**
   * Open the card at the specified index.
   *
   * @param {number} index The card to open. Starts at 0.
   * @param {boolean} closing If this is for closing a card or not.
   */
  toggleCardAt(index: number, closing: boolean) {
    this.headers.get(index).click();
    let method = closing === true ? 'invisibilityOf' : 'presenceOf';
    browser.wait(protractor.ExpectedConditions[method](this.currentDescription), 5000);
  }

  /**
   * Waits until the given popover has the given text.
   *
   * @param {string} text The text to check for.
   */
  checkCardText(text: string) {
    browser.wait(protractor.ExpectedConditions.textToBePresentInElement(this.currentDescription, text), 5000);
  }
}

export class ExperiencePage extends CollapsiblePage {
  menuId = 'experience-menu-item';
  pageElement = element(by.css('.page.experiences'));
  currentDescription = element(by.id('experience-description'));
}

export class SkillsPage extends CollapsiblePage {
  menuId = 'skills-menu-item';
  pageElement = element(by.css('.page.skills'));
  currentDescription = element(by.id('skill-summary'));
  headers = element.all(by.css('.skillset-header'));
  subHeaders = element.all(by.css('.skill-header'));

  /**
   * Waits for any skill to open on the page.
   */
  waitForSkillOpen() {
    browser.wait(protractor.ExpectedConditions.presenceOf(this.currentDescription), 5000);
  }

  /**
   * Open the sub skill at the specified index.
   *
   * @param {number} index The card to open. Starts at 0.
   * @param {boolean} closing If this is for closing a subskill or not.
   */
  toggleSubSkillAt(index: number, closing: boolean) {
    this.subHeaders.get(index).click();
    let method = closing === true ? 'invisibilityOf' : 'presenceOf';
    browser.wait(protractor.ExpectedConditions[method](this.currentDescription), 5000);
  }
}

export class DemosPage extends CollapsiblePage {
  menuId = 'demos-menu-item';
  pageElement = element(by.css('.page.demos'));
  summary = element(by.id('summary'));
  currentDescription = element(by.id('demo-description'));
  modalImage = element(by.id('modal-image'));
  modalClose = element(by.css('.tingle-modal__close'));

  /**
   * Open the lightbox at the specified index.
   *
   * @param {number} index The lightbox to open. Starts at 0.
   */
  openLightboxAt(index: number) {
    element(by.id('lightbox-' + index)).element(by.tagName('img')).click();
  }

  /**
   * Close the currently open lightbox.
   */
  closeLightbox() {
    this.modalClose.click();
  }

  waitUntilImagePresent() {
    browser.wait(protractor.ExpectedConditions.presenceOf(this.modalImage), 5000);
  }

  waitUntilImageNotPresent() {
    browser.wait(protractor.ExpectedConditions.invisibilityOf(this.modalImage), 5000);
  }
}

export class BlogPage extends Page {
  menuId = 'blog-menu-item';
  pageElement = element(by.css('.page.blog'));
  title = element(by.id('post-title'));
}

export class ResumePage extends Page {
  menuId = 'resume-menu-item';
  pageElement = element(by.css('.page.resume'));
  title = element(by.css('.resume-body .header h1'));
}
