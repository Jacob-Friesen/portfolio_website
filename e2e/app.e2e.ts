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

  describe('navigation', function() {
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

    it('should show the demos page', () => {
      demos.navigateTo();
      expect(demos.title.getText()).toEqual('demos works!');
    });

    it('should show the blog page', () => {
      blog.navigateTo();
      expect(blog.title.getText()).toEqual('blog works!');
    });

    it('should show the resume page', () => {
      resume.navigateTo();
      expect(resume.title.getText()).toEqual('resume works!');
    });
  });
});
