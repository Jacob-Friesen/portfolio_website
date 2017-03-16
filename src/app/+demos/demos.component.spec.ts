import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DemosComponent } from './demos.component';
import { LightboxComponent } from '../lightbox';
import { CollapseManagerService } from '../collapse-manager.service';

describe('Component: Demos', () => {
  let fixture,
    component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        LightboxComponent,
        DemosComponent
      ],
      providers: [
        CollapseManagerService
      ],
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(DemosComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
    const node = fixture.debugElement.query(By.all());
    expect(node.nativeElement.innerHTML).not.toEqual('');
  });
});
