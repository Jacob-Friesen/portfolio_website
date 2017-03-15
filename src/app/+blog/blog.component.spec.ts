import { TestBed, async } from '@angular/core/testing';
import { Component } from '@angular/core';
import { BlogRemoteService } from '../blog-remote.service';
import { By } from '@angular/platform-browser';
import { BlogComponent } from './blog.component';
import { JsonpModule } from '@angular/http';

describe('Component: Blog', () => {
  let fixture,
    component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [JsonpModule],
      declarations: [
        BlogComponent
      ],
      providers: [
        BlogRemoteService
      ],
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(BlogComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => TestBed.resetTestingModule());

  it('should create the component', () => {
    expect(component).toBeTruthy();
    const node = fixture.debugElement.query(By.all());
    expect(node.nativeElement.innerHTML).not.toEqual('');
  });

  describe('ngOnInit', function() {
    it('should display loading messages and retrieve the blog post', () => {
      spyOn(component, 'getBlogPost');
      component.ngOnInit();

      expect(typeof component.postTitle === 'string' && component.postTitle !== '').toEqual(true);
      expect(typeof component.postBody === 'string' && component.postBody !== '').toEqual(true);
      expect(component.getBlogPost).toHaveBeenCalledWith();
    });
  });

  describe('getBlogPost', function() {
    it('should subscribe and pass the data to loadPost', () => {
      const subscribe = jasmine.createSpy('subscribe');
      spyOn(component.blogRemote, 'getPost').and.returnValue({ subscribe: subscribe });

      component.getBlogPost();

      expect(subscribe).toHaveBeenCalledWith(jasmine.any(Function), jasmine.any(Function));
    });
  });

  describe('loadPost', function() {
    beforeEach(() => {
      spyOn(component, 'setupPrettyPrint');
    });

    it('should set the postTitle and postBody based on the corresponding data in the sent in post', () => {
      component.loadPost({
        'regular-title': 'A title',
        'regular-body': 'Some body content'
      });

      expect(component.postTitle).toEqual('A title');
      expect(component.postBody).toEqual('Some body content');
    });

    it('should setup pretty printing', async(() => {
      component.loadPost({});

      setTimeout(() => {
        expect(component.setupPrettyPrint).toHaveBeenCalledWith();
      });
    }));
  });
});

@Component({
  selector: 'app-blog-test',
  template: `
    <app-blog></app-blog>
  `,
  directives: [BlogComponent]
})
class BlogComponentTestComponent {
}
