import { CollapseManagerService } from './collapse-manager.service';

describe('CollapseManager Service', () => {
  let service: CollapseManagerService;
  beforeEach(() => service = new CollapseManagerService());

  it('should start with the first item as open', () => {
    expect(service.openIndex).toEqual(0);
  });

  describe('toggle', function() {
    it('should set the open index to the current when it is not the sent in index', () => {

      service.toggle(1);
      expect(service.openIndex).toEqual(1);

      service.toggle(3);
      expect(service.openIndex).toEqual(3);
    });

    it('should set the open index to -1 when it is the sent in index', () => {
      service.toggle(0);
      expect(service.openIndex).toEqual(-1);
    });
  });
});
