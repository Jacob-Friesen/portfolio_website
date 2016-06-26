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
    browser.sleep(100); // Add a better page load later.

    return this;
  }
}

// Until the pages are built out these will all be in one file.

export class HomePage extends Page {
  menuId = 'home-menu-item';
  profileImage = element(by.id('profile-image'));
}

export class CollapsiblePage extends Page {
  currentDescription = element(by.id('card-description'));
  headers = element.all(by.css('.card-header'));
  modalImage = element(by.id('modal-image'));
  modalClose = element(by.css('.tingle-modal__close'));

  /**
   * Open the card at the specified index.
   *
   * @param {number} index The card to open. Starts at 0.
   */
  toggleCardAt(index) {
    this.headers.get(index).click();
    // Wait for it to expand
    browser.sleep(300);
  }
}

export class ExperiencePage extends CollapsiblePage {
  currentDescription = element(by.id('experience-description'));
  menuId = 'experience-menu-item';
}

export class SkillsPage extends CollapsiblePage {
  currentDescription = element(by.id('skill-summary'));
  headers = element.all(by.css('.skillset-header'));
  subHeaders = element.all(by.css('.skill-header'));
  menuId = 'skills-menu-item';

  /**
   * Open the sub skill at the specified index.
   *
   * @param {number} index The card to open. Starts at 0.
   */
  toggleSubSkillAt(index) {
    this.subHeaders.get(index).click();
    // Wait for it to expand
    browser.sleep(300);
  }
}

export class DemosPage extends CollapsiblePage {
  summary = element(by.id('summary'));
  currentDescription = element(by.id('demo-description'));
  menuId = 'demos-menu-item';

  /**
   * Open the lightbox at the specified index.
   *
   * @param {number} index The lightbox to open. Starts at 0.
   */
  openLightboxAt(index) {
    element(by.id('lightbox-' + index)).element(by.tagName('img')).click();
    // Wait for the animations to complete
    browser.sleep(500);
  }

  /**
   * Close the currently open lightbox.
   *
   * @param {number} index The lightbox to open. Starts at 0.
   */
  closeLightbox() {
    this.modalClose.click();
    // Wait for the animations to complete
    browser.sleep(300);
  }
}

export class BlogPage extends Page {
  title = element(by.id('post-title'));
  menuId = 'blog-menu-item';
}

export class ResumePage extends Page {
  menuId = 'resume-menu-item';

  title = element(by.css('.resume-body .header h1'));
}
