import { TopSection, HomePage, ExperiencePage, SkillsPage, DemosPage, BlogPage, ResumePage } from './app.po';

describe('portfolio-website App', function() {
  let page: TopSection;
  let home: HomePage;
  let experience: ExperiencePage;
  let skills: SkillsPage;
  let demos: DemosPage;
  let blog: BlogPage;
  let resume: ResumePage;

  beforeEach(() => {
    page = new TopSection();
    home = new HomePage();
    experience = new ExperiencePage();
    skills = new SkillsPage();
    demos = new DemosPage();
    blog = new BlogPage();
    resume = new ResumePage();
  });

  it('should get the page', () => {
    page.navigateTo();
  });

  // Better seperated tests once the site is actually built.

  describe('pages', function() {
    it('should show the home page', () => {
      home.navigateTo();
      expect(home.profileImage.isDisplayed()).toEqual(true);
    });

    describe('experience', function() {
      var FIRST_EXPERIENCE_TEXT = 'I design and develop interfaces across multiple products (including architecture).',
          THIRD_EXPERIENCE_TEXT = 'Added a new Inventory Location Management system';

      it('should start with the first experience as expanded', () => {
        experience.navigateTo();
        expect(experience.currentDescription.getText()).toContain(FIRST_EXPERIENCE_TEXT);
      });

      it('should show the 3rd experience when it is expanded', () => {
        experience.toggleCardAt(2);
        expect(experience.currentDescription.getText()).toContain(THIRD_EXPERIENCE_TEXT);
      });

      it('should be able to expand the first experience again', () => {
        experience.toggleCardAt(0);
        expect(experience.currentDescription.getText()).toContain(FIRST_EXPERIENCE_TEXT);
      });

      it('should be able to collapse the first experience when it is clicked on again', () => {
        experience.toggleCardAt(0);
        expect(experience.currentDescription.isPresent()).toBe(false);
      });
    });

    it('should show the skills page', () => {
      skills.navigateTo();
      expect(skills.title.getText()).toEqual('skills works!');
    });

    describe('demos', () => {
      var FIRST_DEMO_TEXT = 'This application provide a few simple tools and targeted information for Catholics',
          THIRD_DEMO_TEXT = 'This is the prototype interface I designed for a project at work';

      it('should show the demos page', () => {
        demos.navigateTo();
        expect(demos.summary.getText()).not.toEqual('');
      });

      it('should show a lightbox for the first items image', function() {
        demos.openLightboxAt(0);
        expect(demos.modalImage.isDisplayed()).toBe(true);
      });

      it('should be able to close that lightbox', function() {
        demos.closeLightbox();
        expect(demos.modalImage.isDisplayed()).toBe(false);
      });

      it('should start with the first demo as expanded', () => {
        expect(demos.currentDescription.getText()).toContain(FIRST_DEMO_TEXT);
      });

      it('should show the 3rd demo when it is expanded', () => {
        demos.toggleCardAt(2);
        expect(demos.currentDescription.getText()).toContain(THIRD_DEMO_TEXT);
      });

      it('should be able to expand the first demo again', () => {
        demos.toggleCardAt(0);
        expect(demos.currentDescription.getText()).toContain(FIRST_DEMO_TEXT);
      });

      it('should be able to collapse the first demo when it is clicked on again', () => {
        demos.toggleCardAt(0);
        expect(demos.currentDescription.isPresent()).toBe(false);
      });
    });

    it('should show the loaded blog page', () => {
      blog.navigateTo();
      expect(blog.title.getText()).not.toEqual('');
    });

    it('should show the resume page', () => {
      resume.navigateTo();
      resume.title.getText().then((contents) => {
        expect(contents.replace(/\n/g, ' ')).toEqual('Jacob Friesen - Front End Developer');
      });
    });
  });
});
