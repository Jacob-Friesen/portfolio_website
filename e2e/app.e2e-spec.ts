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
      let FIRST_EXPERIENCE_TEXT = 'Full stack JavaScript development on the companies first product (pre-beta',
          THIRD_EXPERIENCE_TEXT = 'Improved Panda, the internal web application.';

      it('should start with the first experience as expanded', () => {
        experience.navigateTo();
        expect(experience.currentDescription.getText()).toContain(FIRST_EXPERIENCE_TEXT);
      });

      it('should show the 3rd experience when it is expanded', () => {
        experience.toggleCardAt(2, false);
        expect(experience.currentDescription.getText()).toContain(THIRD_EXPERIENCE_TEXT);
      });

      it('should be able to expand the first experience again', () => {
        experience.toggleCardAt(0, false);
        expect(experience.currentDescription.getText()).toContain(FIRST_EXPERIENCE_TEXT);
      });

      it('should be able to collapse the first experience when it is clicked on again', () => {
        experience.toggleCardAt(0, true);
        expect(experience.currentDescription.isPresent()).toBe(false);
      });
    });

    describe('skills', function() {
      let SKILL_0_0 = 'I have used JavaScript in client side (browser)',
          SKILL_0_3 = 'I have created many types of layouts ranging from complex',
          SKILL_3_0 = 'Most of my work experiences involved a Linux environment';

      it('should start with the 1st skill of the first skillset as expanded', () => {
        skills.navigateTo();
        skills.waitForSkillOpen();
        expect(skills.currentDescription.getText()).toContain(SKILL_0_0);
      });

      it('should be able to expand the 3rd skill of the first skillset', () => {
        skills.toggleSubSkillAt(2, false);
        expect(skills.currentDescription.getText()).toContain(SKILL_0_3);
      });

      it('should show 1st skill of the the 3rd skills when it is expanded', () => {
        skills.toggleCardAt(2, false);
        skills.checkCardText(SKILL_3_0);
      });

      it('should be able to expand to the first skill of the first skillset again', () => {
        skills.toggleCardAt(0, false);
        skills.checkCardText(SKILL_0_0);
      });

      it('should be able to collapse the first skillset when it is clicked on again', () => {
        skills.toggleCardAt(0, true);
        expect(skills.currentDescription.isPresent()).toBe(false);
      });
    });

    describe('demos', () => {
      let FIRST_DEMO_TEXT = 'This application provide a few simple tools and targeted information for Catholics',
          THIRD_DEMO_TEXT = 'This is the prototype interface I designed for a project at work';

      it('should show the demos page', () => {
        demos.navigateTo();
        expect(demos.summary.getText()).not.toEqual('');
      });

      it('should show a lightbox for the first items image', function() {
        demos.openLightboxAt(0);
        demos.waitUntilImagePresent();
      });

      it('should be able to close that lightbox', function() {
        demos.closeLightbox();
        demos.waitUntilImageNotPresent();
      });

      it('should start with the first demo as expanded', () => {
        expect(demos.currentDescription.getText()).toContain(FIRST_DEMO_TEXT);
      });

      it('should show the 3rd demo when it is expanded', () => {
        demos.toggleCardAt(2, false);
        expect(demos.currentDescription.getText()).toContain(THIRD_DEMO_TEXT);
      });

      it('should be able to expand the first demo again', () => {
        demos.toggleCardAt(0, false);
        expect(demos.currentDescription.getText()).toContain(FIRST_DEMO_TEXT);
      });

      it('should be able to collapse the first demo when it is clicked on again', () => {
        demos.toggleCardAt(0, true);
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
        expect(contents.replace(/\n/g, ' ')).toEqual('Jacob Friesen - Software Developer');
      });
    });
  });
});
