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

export class ExperiencePage extends Page {
  menuId = 'experience-menu-item';
}

export class SkillsPage extends Page {
  menuId = 'skills-menu-item';
}

export class DemosPage extends Page {
  summary = element(by.id('summary'));
  currentDescription = element(by.id('demo-description'));
  demoHeaders = element.all(by.css('.demo-header'));
  modalImage = element(by.id('modal-image'));
  modalClose = element(by.css('.tingle-modal__close'));

  menuId = 'demos-menu-item';

  /**
   * Open the demo at the specified index.
   *
   * @param {number} index The demo to open. Starts at 0.
   */
  toggleDemoAt(index) {
    this.demoHeaders.get(index).click();
    // Wait for it to expand
    browser.sleep(300);
  }

  /**
   * Open the lightbox at the specified index.
   *
   * @param {number} index The lightbox to open. Starts at 0.
   */
  openLightboxAt(index) {
    element(by.id('lightbox-' + index)).element(by.tagName('img')).click();
    // Wait for the animations to complete
    browser.sleep(300);
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
