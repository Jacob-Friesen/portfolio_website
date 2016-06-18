/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { CollapseManagerService } from './collapse-manager.service';

describe('CollapseManager Service', () => {
  beforeEachProviders(() => [CollapseManagerService]);

  it('should start with the first item as open', inject([CollapseManagerService], (service: CollapseManagerService) => {
    expect(service.openIndex).toEqual(0);
  }));

  describe('toggle', function() {
    it('should set the open index to the current when it is not the sent in index',
      inject([CollapseManagerService], (service: CollapseManagerService) => {

      service.toggle(1);
      expect(service.openIndex).toEqual(1);

      service.toggle(3);
      expect(service.openIndex).toEqual(3);
    }));

    it('should set the open index to -1 when it is the sent in index',
      inject([CollapseManagerService], (service: CollapseManagerService) => {

      service.toggle(0);
      expect(service.openIndex).toEqual(-1);
    }));
  });
});
