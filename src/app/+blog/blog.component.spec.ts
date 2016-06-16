import {
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  it,
  inject,
} from '@angular/core/testing';
import { ComponentFixture, TestComponentBuilder } from '@angular/compiler/testing';
import { Component } from '@angular/core';
import { BlogRemoteService } from '../blog-remote.service';
import { By } from '@angular/platform-browser';
import { BlogComponent } from './blog.component';
import { JSONP_PROVIDERS, RequestOptions } from '@angular/http';
import * as _ from 'lodash';

describe('Component: Blog', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [
    JSONP_PROVIDERS,
    BlogRemoteService,
    BlogComponent
  ]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(BlogComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(BlogComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));

  describe('ngOnInit', function() {
    it('should display loading messages and retrieve the blog post',
    inject([BlogComponent], (component: BlogComponent) => {
      spyOn(component, 'getBlogPost');

      component.ngOnInit();

      expect(_.isString(component.postTitle) && !_.isEmpty(component.postTitle)).toEqual(true);
      expect(_.isString(component.postBody) && !_.isEmpty(component.postBody)).toEqual(true);
      expect(component.getBlogPost).toHaveBeenCalledWith();
    }));
  });

  describe('getBlogPost', function() {
    it('should subscribe and pass the data to loadPost',
    inject([BlogComponent], (component: BlogComponent) => {
      const subscribe = jasmine.createSpy('subscribe');
      spyOn(component.blogRemote, 'getPost').and.returnValue({ subscribe: subscribe });

      component.getBlogPost();

      expect(subscribe).toHaveBeenCalledWith(jasmine.any(Function), jasmine.any(Function));
    }));
  });

  describe('loadPost', function() {
    it('should set the postTitle and postBody based on the corresponding data in the sent in post',
    inject([BlogComponent], (component: BlogComponent) => {
      component.loadPost({
        'regular-title': 'A title',
        'regular-body': 'Some body content'
      });

      expect(component.postTitle).toEqual('A title');
      expect(component.postBody).toEqual('Some body content');
    }));
  });
});

@Component({
  selector: 'test',
  template: `
    <app-blog></app-blog>
  `,
  directives: [BlogComponent]
})
class BlogComponentTestController {
}

