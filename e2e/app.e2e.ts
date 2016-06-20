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

    it('should show the experience page', () => {
      experience.navigateTo();
      expect(experience.title.getText()).toEqual('experience works!');
    });

    it('should show the skills page', () => {
      skills.navigateTo();
      expect(skills.title.getText()).toEqual('skills works!');
    });

    describe('demos', () => {
      var FIRST_DEMO_TEXT = 'For my Machine Learning class',
          THIRD_DEMO_TEXT = 'In Cryptography in the fall school term';

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
        demos.toggleDemoAt(2);
        expect(demos.currentDescription.getText()).toContain(THIRD_DEMO_TEXT);
      });

      it('should be able to expand the first demo again', () => {
        demos.toggleDemoAt(0);
        expect(demos.currentDescription.getText()).toContain(FIRST_DEMO_TEXT);
      });

      it('should be able to collapse the first demo when it is clicked on again', () => {
        demos.toggleDemoAt(0);
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
