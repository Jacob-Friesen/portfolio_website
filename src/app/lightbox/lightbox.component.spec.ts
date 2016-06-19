/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { LightboxComponent } from './lightbox.component';

describe('Component: Lightbox', () => {
  it('should create an instance', () => {
    let component = new LightboxComponent();
    expect(component).toBeTruthy();
  });
});
